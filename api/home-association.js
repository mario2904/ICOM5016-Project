const passport = require('passport');
const requireAuth = passport.authenticate('jwt', {session: false});

const moment = require('moment');
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
          date: moment(date_created).format("YYYY-MM-DD"),
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
    WITH partial_association AS (
      SELECT association_id, association_name
      FROM associations
    )
    SELECT event_id, event_name, association_name, association_id, start_date, end_date, start_time, end_time, event_location, image_path, description, registration_link
    FROM partial_association natural join events natural join images
    WHERE association_id = $[id]`, {id})
    .then(data => {
      console.log('Success: Events Info Home-Association')
      data.forEach(a => {
        a.start_date = moment(a.start_date).format("YYYY-MM-DD");
        a.end_date = moment(a.end_date).format("YYYY-MM-DD");

       });
      res.json(data);
    })
    .catch(error => {
      console.log('All Events Home-Association Failed')
      next(error);
    });
});

module.exports = router;
