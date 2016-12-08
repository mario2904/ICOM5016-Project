const passport = require('passport');
const requireAuth = passport.authenticate('jwt', {session: false});

const router = require('express').Router();
const db1 = require('../db');

router.get('/reviews', requireAuth, (req, res, next) => {
  console.log(req.params);
  // After auth check req.user.id = id of user.
  const { id } = req.user;

  db1.any(`
    SELECT review_id, first_name, last_name, image_path, review, date_created, event_name, rating
    FROM review natural join students natural join images, events
    WHERE association_id= $[id] and events.event_id = review.event_id`, {id})
    .then(data => {
      const response = data.map(review_i => {
        const { review_id, first_name, last_name, image_path, review, date_created, event_name, rating } = review_i;
        return {
          image: image_path,
          summary: `${first_name} ${last_name} has reviewed your event: ${event_name}`,
          date: date_created,
          extraText: review
        }
      });
      console.log('Success: Events Info Home-Association')
      res.json(response);
      })
      .catch(error => {
        console.log('Events Info Home-Association Failed')
        next(error);
      });
});

router.get('/events', requireAuth, (req, res, next) => {
  console.log(req.params);
  // After auth check req.user.id = id of user.
  const { id } = req.user;

  db1.any(`
    SELECT event_id, E.event_name, A.association_name, A.association_id, start_date, end_date, start_time, end_time, room, image_path, description, registration_link
    FROM events as E, associations as A, images as I, location as L
    WHERE E.association_id = A.association_id and E.image_id = I.image_id and E.location_id = L.location_id and A.association_id= $[id]`, {id})
    .then(data => {
      console.log('Success: Events Info Home-Association')
      res.json(data);
    })
    .catch(error => {
      console.log('All Events Home-Association Failed')
      next(error);
    });
});

module.exports = router;
