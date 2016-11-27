const router = require('express').Router();
const db1 = require('../db');

// GET - Get All Students Info (Admin)
// response:
//    [] students:
//        account_id: uuid
//        user_id: uuid
//        first_name: string
//        last_name: string
//        hometown: string
//        college: string
//        major: string
//        gender: string
//        birthdate: date
//        email: string
//        date_created: timestamp
//        image_path: string
//        bio: string
router.get('/student/all', (req, res) => {
  db1.any(`
    SELECT account_id, user_id, first_name, last_name, hometown, college, major, gender, bio, birthdate, email, date_created, image_path
    FROM students natural join account natural join images`)
    .then(function(data) {
      // Send All Students Information
      console.log('Success: Admin Get All Students Information');
      res.json({students: data})
    })
    .catch(function(error) {
      console.log(error);
      return res.status(400).send('Error: Problem executing Query');
    });
});

// GET - Get All Associations Info (Admin)
// response:
//    [] associations:
//        account_id: uuid
//        association_id: uuid
//        association_name: string
//        initials: string
//        email: string
//        page_link: string
//        image_path: string
//        bio: string
//        date_created: timestamp
//        room: string
//        building: string
//        city: string
router.get('/association/all', (req, res) => {
  db1.any(`
    SELECT account_id, association_id, association_name, initials, page_link, image_path, email, bio, room, building, city, date_created
    FROM associations natural join account natural join location natural join images`)
    .then(function(data) {
      // Send All Associations Information
      console.log('Success: Admin Get All Associations Information');
      res.json({associations: data});
    })
    .catch(function(error) {
      console.log(error);
      return res.status(400).send('Error: Problem executing Query');
    });
});

// GET - Get All Events Info (Admin)
// response:
//  [] events
//      event_id: id
//      event_name: string
//      is_live: bool (yes/no)
//      registration_link: string
//      start_date: date
//      end_date: date
//      start_time: time
//      end_time: time
//      room: string
//      building: string
//      city: string
//      image_path: string
//      time_stamp: timestamp
router.get('/event/all', (req, res) => {
  db1.any(`
    SELECT event_id, event_name, is_live, registration_link, start_date, end_date, start_time, end_time, room, building, city, image_path, time_stamp
    FROM events natural join images natural join location`)
    .then(function(data) {
      // Send All Events Information
      console.log('Success: Admin Get All Events Information');
      res.json({events: data});
    })
    .catch(function(error) {
      console.log(error);
      return res.status(400).send('Error: Problem executing Query');
    });
});

module.exports = router;
