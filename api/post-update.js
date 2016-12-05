const router = require('express').Router();
const db1 = require('../db');
const passport = require('passport');
const requireAuth = passport.authenticate('jwt', {session: false});


router.post('/', requireAuth, (req, res, next) => {
  console.log("hello");
  // Destructure params
  const { id } = req.user;
  const { notification_name, event_id,notification_text } = req.body;
  console.log(id);
  console.log(event_id);
  db1.one(`
    SELECT association_id
    FROM events
    WHERE event_id = $[event_id]`,{event_id})
    .then(function (data) {
    // success;
    console.log("SELECT FROM POST");
    console.log(typeof data.association_id);
    console.log(typeof id);
    if(parseInt(data.association_id)===id) {
      db1.none(`
        INSERT INTO notifications (notification_name, date_sent,event_id,notification_text)
        SELECT $[notification_name], CURRENT_TIMESTAMP, $[event_id], $[notification_text]`,{notification_name,event_id,notification_text})
        .then(function () {
        // success;
        res.sendStatus(200);
        console.log("Update Added");
        })
        .catch(function (error) {
        // error;
        console.log("Update Failed");
        });
    }
    else {
      res.sendStatus(401);
      console.log("Association is not owner of event tring to update.");
    }
    })
    .catch(function (error) {
    // error;
    console.log("Review Failed");
    });


});

module.exports = router;
