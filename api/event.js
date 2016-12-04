const router = require('express').Router();
const db1 = require('../db');

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
router.get('/:id', (req, res) => {
  console.log(req.params);
  // Destructure params
  const { id } = req.params;
  const responseDB = {};
  const eventInfo = {};
  // TODO: Check if it is in the db...
  //

  db1.one("SELECT event_id, E.event_name, A.association_name, A.association_id, start_date, end_date, start_time, end_time, room, image_path, description, registration_link \
            FROM events as E, associations as A, images as I, location as L \
            WHERE E.association_id = A.association_id and E.image_id = I.image_id and E.location_id = L.location_id and event_id=${idused}", {idused: id})
      .then(function (data) {
        //console.log(data);
        responseDB.eventInfo = {};
        responseDB.eventInfo = data;

        db1.any("SELECT first_name, last_name, user_id, image_path \
            FROM interested natural join students natural join images \
            WHERE event_id=${idused}", {idused: id})
            .then(function (data) {
              responseDB.interestedResponse = data;

              db1.any("SELECT notification_id, notification_text, notification_name,date_sent \
                        FROM notifications \
                        WHERE event_id=${idused}", {idused: id})
                  .then(function (data) {
                    responseDB.updateResponse = data;
                    db1.any("SELECT review_id, first_name, last_name, image_path, review, date_created, rating, user_id \
                              FROM review natural join students natural join images \
                              WHERE event_id=${idused}", {idused: id})
                        .then(function (data) {
                          responseDB.reviewResponse = data;

                          db1.any("SELECT category_name \
                                    FROM events_categories natural join category \
                                    WHERE event_id=${idused}", {idused: id})
                              .then(function (data) {
                                responseDB.categoriesResponse = data;


                                const { event_id, event_name, association_id, association_name, start_date, end_date, start_time, end_time, room, image_path, description, registration_link } = responseDB.eventInfo;
                                var  concatenatedCategories = data.map((category) => category.category_name);

                                const response = {

                                  event_id,
                                  event_name,
                                  association_id ,
                                  association_name,
                                  start_date,
                                  end_date,
                                  start_time,
                                  end_time,
                                  room,
                                  image_path,
                                  description,
                                  registration_link,
                                  interested: responseDB.interestedResponse,
                                  updates: responseDB.updateResponse,
                                  reviews: responseDB.reviewResponse,
                                  categories: concatenatedCategories
                                  //Le Falta
                                  //interested = array = [firstName, lastName, userImage, userID]
                                  //updates = array = [id, title, text, timestamp]
                                  //review  = array = [reviewID, firstName, LastName, UserImage, comment, timestamp, rating, userId]
                                  //categories [array]

                                }


                                // Send Event Information
                                console.log('Success: Get Event Information');
                                res.json(response);







                              })
                              .catch(function (error) {
                                  // error;
                                  console.log('Individual Event: categories failed.')
                              });
                        })
                        .catch(function (error) {
                            // error;
                            console.log('Individual Event: review failed.')
                        });

                  })
                  .catch(function (error) {
                      // error;
                      console.log('Individual Event: update failed.')
                  });
            })
            .catch(function (error) {
                // error;
                console.log('Individual Event: interested failed.')
            });

      })
      .catch(function (error) {
          // error;
          console.log('Individual Event Info Failed')
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
router.get('/stats/:id', (req, res) => {
  console.log(req.params);
  // Destructure params
  const { id } = req.params;
  const response = {};

  // Get Colleges
  db1.any(`
    SELECT college, count(*)
    FROM students natural join interested
    WHERE event_id = $[idused]
    GROUP BY college;`, {idused: id})
    .then(function(data) {
      // Change count type. From string to int
      data.forEach(obj => obj.count = +obj.count);

      console.log(data);
      response.colleges = data;

      // Get Majors
      db1.any(`
        SELECT major, count(*)
        FROM students natural join interested
        WHERE event_id = $[idused]
        GROUP BY major`, {idused: id})
      .then(function(data) {
        // Change count type. From string to int
        data.forEach(obj => obj.count = +obj.count);

        console.log(data);
        response.majors = data;

        // Get Genders
        db1.any(`
          SELECT gender, count(*)
          FROM students natural join interested
          WHERE event_id = $[idused]
          GROUP BY gender`, {idused: id})
        .then(function(data) {
          // Change count type. From string to int
          data.forEach(obj => obj.count = +obj.count);

          console.log(data);
          response.genders = data;

          // Get Hometowns
          db1.any(`
            SELECT hometown, count(*)
            FROM students natural join interested
            WHERE event_id = $[idused]
            GROUP BY hometown`, {idused: id})
          .then(function(data) {
            // Change count type. From string to int
            data.forEach(obj => obj.count = +obj.count);

            console.log(data);
            response.hometowns = data;

            // Get Ages
            db1.any(`
              SELECT date_part('year', age(birthdate)) as age, count(*)
              FROM students natural join interested
              WHERE event_id = $[idused]
              GROUP BY date_part('year', age(birthdate));`, {idused: id})
            .then(function(data) {
              // Change count type. From string to int
              data.forEach(obj => obj.count = +obj.count);

              console.log(data);
              response.ages = data;

              // GET interested
              db1.any(`
                SELECT stat_date as date, interested_count as count
                FROM event_stats
                WHERE event_id = $[idused]
                ORDER BY stat_date`, {idused: id})
              .then(function(data) {
                // Change count type. From string to int
                data.forEach(obj => obj.count = +obj.count);

                console.log(data);
                response.interested = data;

                db1.one(`
                  SELECT event_name, image_path
                  FROM events natural join images
                  WHERE event_id = $[idused]`, {idused: id})
                .then(function(data) {
                  console.log(data);
                  response.general = data;

                  // Send Event Information
                  console.log('Success: Get Event Stats');
                  res.json(response);
                })
                .catch(function(error) {
                  // error;
                  console.log('Event Stats: image_path and event_name failed.');
                });
              })
              .catch(function(error) {
                // error;
                console.log('Event Stats: interested failed.');
              });
            })
            .catch(function(error) {
              // error;
              console.log('Event Stats: ages failed.');
            });
          })
          .catch(function(error) {
            // error;
            console.log('Event Stats: hometowns failed.');
          });
        })
        .catch(function(error) {
          // error;
          console.log('Event Stats: genders failed.');
        });
      })
      .catch(function(error) {
        // error;
        console.log('Event Stats: majors failed.');
      });
    })
    .catch(function (error) {
      // error;
      console.log('Event Stats: colleges failed.');
    });

});

module.exports = router;
