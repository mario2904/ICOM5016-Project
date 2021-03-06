const router = require('express').Router();
const db1 = require('../db');
const moment = require('moment');

// GET - Get Student Info
// params:
//    id: uuid
// response:
//    firstName: string
//    lastName: string
//    major: string
//    interestedEvents: [] uuid
//    followedAssociations: [] uuid
//    profileImage: string
//    bio: string
router.get('/:id', (req, res, next) => {
  console.log(req.params);
  // Destructure params
  const { id } = req.params;
  // TODO: Check if it is in the db...
  db1.task(t => {
      return t.batch([
        t.one(`
          SELECT first_name, last_name, gender, hometown, college, major, image_path, bio, email
          FROM students natural join account natural join images
          WHERE user_id = $[id]`, {id}),
        t.any(`
          SELECT event_id, event_name, association_name, start_date, end_date, start_time, end_time, event_location, image_path
          FROM interested natural join events natural join images, associations
          WHERE user_id = $[id] and events.association_id = associations.association_id`, {id}),
        t.any(`
          SELECT association_id, association_name, initials, image_path
          FROM followed_associations natural join associations natural join images
          WHERE user_id = $[id]`, {id})
      ]);
    })
    .then(data => {
      console.log('Success: Get Student Information');
      const { first_name, last_name, gender, hometown, college, major, image_path, bio, email } = data[0];
      data[1].forEach(a => {
        a.start_date = moment(a.start_date).format("YYYY-MM-DD");
        a.end_date = moment(a.end_date).format("YYYY-MM-DD");

       });
      const response = {
        first_name,
        last_name,
        gender,
        hometown,
        college,
        major,
        image_path,
        bio,
        email,
        interestedEvents: data[1],
        followedAssociations: data[2]
      };
      res.json(response);

    })
    .catch(error => {
      console.log('Error Student Information');
      next(error);
    });

});

module.exports = router;
