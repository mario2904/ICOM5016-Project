const moment = require('moment');
const router = require('express').Router();
const db1 = require('../db');


// GET - Event Information
// response:
//    [] event
//        id: uuid
//        name: string
//        associationId: uuid
//        associationName: string
//        startDate: date
//        endDate: date
//        startTime: time
//        endTime: time
//        location: string
//        image: string
//        description: string
//        registrationLink: string
// TODO: Make it better
router.get('/all', (req, res, next) => {
  const response = [];

  db1.any(`
    SELECT event_id, E.event_name, A.association_name, A.association_id, start_date, end_date, start_time, end_time, event_location, image_path, description, registration_link
    FROM events as E, associations as A, images as I
    WHERE E.association_id = A.association_id and E.image_id = I.image_id`, [true])
      .then(function (data) {
          // success;
          console.log(data);
          for (let i = 0; i < data.length; i++) {

              // Destructure association information

              const { event_id, event_name, association_id, association_name, start_date, end_date, start_time, end_time, event_location, image_path, description, registration_link } = data[i];
              // TODO: Get extra information from the db
              //
              // Get extra information from the Testing db (other tables)
              // The list of student s interested of going.

              const singleEvent = {

                event_id,
                event_name,
                association_id ,
                association_name,
                start_date: moment(start_date).format("YYYY-MM-DD"),
                end_date: moment(end_date).format("YYYY-MM-DD"),
                start_time,
                end_time,
                event_location,
                image_path,
                description,
                registration_link

              }

              response.push(singleEvent);


          }

            // Send Event Information
            console.log('Success: Get Event Information');
            res.json({events: response});
          //console.log(data[0])
          console.log('worked')
      })
      .catch(function (error) {
          // error;
          console.log('no function')
      });
});


// GET - Event Information
// params:
//    id: uuid
// response:
//    name: string
//    associationId: uuid
//    associationName: string
//    startDate: date
//    endDate: date
//    startTime: time
//    endTime: time
//    location: string
//    image: string
//    description: string
//    registrationLink: string
router.get('/:id', (req, res, next) => {
  console.log(req.params);
  // Destructure params
  const { id } = req.params;
  // TODO: Check if it is in the db...
  //
  db1.task(t => {
      return t.batch([
        t.one(`
          WITH partial_association AS (
          	SELECT association_id, association_name
          	FROM associations
          )
          SELECT event_id, event_name, association_name, association_id, start_date, end_date, start_time, end_time, event_location, image_path, description, registration_link
          FROM partial_association natural join events natural join images
          WHERE event_id = $[id]`, {id}),
        t.any(`
          SELECT first_name, last_name, user_id, image_path
          FROM interested natural join students natural join images
          WHERE event_id=$[id]`, {id}),
        t.any(`
          SELECT notification_id, notification_text, notification_name,date_sent
          FROM notifications
          WHERE event_id=$[id]`, {id}),
        t.any(`
          SELECT review_id, first_name, last_name, image_path, review, date_created, rating, user_id
          FROM review natural join students natural join images
          WHERE event_id=$[id]`, {id}),
        t.any(`
          SELECT category_name
          FROM events_categories natural join category
          WHERE event_id=$[id]`, {id})
      ]);
    })
    .then(data => {
      // console.log(data[0].event_id);
      const { event_id, event_name, association_id, association_name, start_date, end_date, start_time, end_time, event_location, image_path, description, registration_link } = data[0];
      const response = {
        event_id,
        event_name,
        association_id,
        association_name,
        start_date: moment(start_date).format("YYYY-MM-DD"),
        end_date: moment(end_date).format("YYYY-MM-DD"),
        start_time,
        end_time,
        event_location,
        image_path,
        description,
        registration_link,
        interested: data[1],
        updates: data[2],
        reviews: data[3],
        categories: data[4].map((category) => category.category_name)
      }
      console.log('Success: Get Event Information');
      console.log(response);
      res.json(response);
    })
    .catch(error => {
      console.log("DB QUERY ERROR: Individual Event");
      next(error);
    });

});

// GET - Event stats
// response:
//    [] genders
//        {gender: string, count: int}
//    [] ages
//        {age: int, count: int}
//    [] hometowns
//        {hometown: string, count: int}
//    [] colleges
//        {college: string, count: int}
//    [] majors
//        {major: string, count: int}
//    [] interested
//        {date: 'time stamp', count: int}
//    {} general
//        event_name: string
//        image_path: string
//
router.get('/stats/:id', (req, res, next) => {
  console.log(req.params);
  // Destructure params
  const { id } = req.params;
  const response = {};

  db1.task(t => {
      return t.batch([
        t.any(`
          SELECT college, count(*)
          FROM students natural join interested
          WHERE event_id = $[id]
          GROUP BY college;`, {id}),
        t.any(`
          SELECT major, count(*)
          FROM students natural join interested
          WHERE event_id = $[id]
          GROUP BY major`, {id}),
        t.any(`
          SELECT gender, count(*)
          FROM students natural join interested
          WHERE event_id = $[id]
          GROUP BY gender`, {id}),
        t.any(`
          SELECT hometown, count(*)
          FROM students natural join interested
          WHERE event_id = $[id]
          GROUP BY hometown`, {id}),
        t.any(`
          SELECT date_part('year', age(birthdate)) as age, count(*)
          FROM students natural join interested
          WHERE event_id = $[id]
          GROUP BY date_part('year', age(birthdate));`, {id}),
        t.one(`
          SELECT event_name, image_path
          FROM events natural join images
          WHERE event_id = $[id]`, {id})
      ]);

    })
    .then(data => {
      console.log(data);
      for (let i = 0; i < data.length - 1; i++) {
        data[i].forEach(obj => obj.count = +obj.count);
      }
      const response = {
        colleges: data[0],
        majors: data[1],
        genders: data[2],
        hometowns: data[3],
        ages: data[4],
        general: data[5]
      };
      console.log('Success: Get Event Stats');
      res.json(response);
    })
    .catch(error => {
      console.log("DB QUERY ERROR: Get Event Stats");
      next(error);
    });

});

module.exports = router;
