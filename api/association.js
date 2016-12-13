const router = require('express').Router();
const db1 = require('../db');
const moment = require('moment');

// GET - All Associations Information
// response:
//    [] association
//        id: uuid
//        name: string
//        initials: string
//        location: string
//        link: string
//        email: string
//        profileImage: string
//        bio: string
//        sponsors: [] uuid
//        activeEvents: [] uuid
//        pastEvents: [] uuid
//        followers: [] uuid
// TODO: MAKE it better
router.get('/all', (req, res, next) => {
  const response = [];
  db1.any(`
    SELECT association_id, association_name, initials, association_location, page_link, email, image_path, bio
    FROM associations natural join account natural join images`, [true])
      .then(function (data) {
          // success;

          for (let i = 0; i < data.length; i++) {

              // Destructure association information
              const { association_id, association_name, initials, association_location, page_link, email, image_path, bio } = data[i];
              // TODO: Get extra information from the db
              //
              // Get extra information from the Testing db (other tables)


              const singleAssociation = {

                association_id,
                association_name,
                initials,
                association_location,
                page_link,
                email,
                image_path,
                bio

              }
              response.push(singleAssociation);

          }

          // Send All Associations Information
          console.log('Success: Get All Associations Information');
          res.json({associations: response})
          //console.log(data[0])
          console.log('worked')
      })
      .catch(function (error) {
          // error;
          console.log('no function')
      });

});


// GET - Association Information
// params:
//    id: uuid
// response
//    name: string
//    initials: string
//    location: string
//    link: string
//    email: string
//    profileImage: string
//    bio: string
//    sponsors: [] uuid
//    activeEvents: [] uuid
//    pastEvents: [] uuid
//    followers: [] uuid
router.get('/:id', (req, res, next) => {
  console.log(req.params);
  // Destructure params
  const { id } = req.params;
  // TODO: Check if it is in the db...
  //
  db1.task(t => {
      return t.batch([
        t.one(`
          SELECT association_name, initials, association_location, page_link, email, image_path, bio
          FROM associations natural join account natural join images
          WHERE association_id = $[id]`, {id}),
        t.any(`
          WITH partial_association AS (
          	SELECT association_id, association_name
          	FROM associations
          )
          SELECT event_id, event_name, association_id, association_name, description, registration_link, start_date, end_date, start_time, end_time, event_location, image_path
          FROM partial_association natural join events natural join images
          WHERE association_id = $[id] and is_live = true`, {id}),
        t.any(`
          WITH partial_association AS (
          	SELECT association_id, association_name
          	FROM associations
          )
          SELECT event_id, event_name, association_id, association_name, description, registration_link, start_date, end_date, start_time, end_time, event_location, image_path
          FROM partial_association natural join events natural join images
          WHERE association_id = $[id] and is_live = false`, {id}),
        t.any(`
          SELECT sponsor_name, image_path
          FROM association_sponsors natural join sponsors natural join images
          WHERE association_id = $[id]`, {id}),
        t.one(`
          SELECT count(user_id)
          FROM followed_associations
          WHERE association_id = $[id]`, {id})
      ]);

    })
    .then(data => {
      console.log('Success: Get All Associations Information');
      const { association_name, initials, association_location, page_link, email, image_path, bio } = data[0];
      data[1].forEach(a => {
        a.start_date = moment(a.start_date).format("YYYY-MM-DD");
        a.end_date = moment(a.end_date).format("YYYY-MM-DD");

       });
       data[2].forEach(a => {
         a.start_date = moment(a.start_date).format("YYYY-MM-DD");
         a.end_date = moment(a.end_date).format("YYYY-MM-DD");

        });
      const response = {
        association_name,
        initials,
        association_location,
        page_link,
        email,
        image_path,
        bio,
        activeEvents: data[1],
        pastEvents: data[2],
        sponsors: data[3],
        followers: data[4]
      }
      res.json(response);

    })
    .catch(error => {
      console.log('Error: Get AssociationInfo');
      next(error);
    });

});

module.exports = router;
