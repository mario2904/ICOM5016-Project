const router = require('express').Router();
const db1 = require('../db');
const passport = require('passport');
const requireAuth = passport.authenticate('jwt', {session: false});


router.post('/', requireAuth, (req, res, next) => {

  // Destructure params
  const { id } = req.user;
  const { notification_name, event_id, notification_text } = req.body;

  db1.task(function *(t) {
    let { association_id } = yield t.one(`
      SELECT association_id
      FROM events
      WHERE event_id = $[event_id]`, {event_id});
    if (parseInt(association_id) !== id) { return 401; }
    return yield t.none(`
      INSERT INTO notifications (notification_name, date_sent,event_id,notification_text)
      SELECT $[notification_name], CURRENT_TIMESTAMP, $[event_id], $[notification_text]`, {notification_name,event_id, notification_text});

    })
    .then(data => {
      console.log('Correct Query. ');
      (!data) ? res.sendStatus(200) : res.sendStatus(data);
    })
    .catch(error => {
      console.log("Update Failed");
      next(error);
    });

});

module.exports = router;
