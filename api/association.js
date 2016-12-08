const router = require('express').Router();
const db1 = require('../db');


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
          SELECT association_name, initials, room, page_link, email, image_path, bio
          FROM associations natural join account natural join images natural join location
          WHERE association_id = $[id]`, {id}),
        t.any(`
          SELECT event_id, E.event_name, A.association_name, A.association_id, start_date, end_date, start_time, end_time, room, image_path, description, registration_link
          FROM events as E, associations as A, images as I, location as L
          WHERE E.association_id = A.association_id and E.image_id = I.image_id and E.location_id = L.location_id and A.association_id = $[id] and is_live = 'yes'`, {id}),
        t.any(`
          SELECT event_id, E.event_name, A.association_name, A.association_id, start_date, end_date, start_time, end_time, room, image_path, description, registration_link
          FROM events as E, associations as A, images as I, location as L
          WHERE E.association_id = A.association_id and E.image_id = I.image_id and E.location_id = L.location_id and A.association_id = $[id] and is_live = 'no'`, {id}),
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
      const { association_name, initials, room, page_link, email, image_path, bio } = data[0];
      const response = {
        association_name,
        initials,
        room,
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
