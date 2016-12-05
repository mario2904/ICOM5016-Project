const router = require('express').Router();
const db1 = require('../db');
const passport = require('passport');
const requireAuth = passport.authenticate('jwt', {session: false});


router.post('/', requireAuth ,  (req, res, next) => {
  console.log("hello");
  // Destructure params
  const { id } = req.user;
  const { event_id, action } = req.body;
  console.log(id);
  console.log(event_id);
  // If action is true, it means the user is interested in the event
  if (action === 'true'){
    db1.none(`
      INSERT INTO interested (event_id, user_id)
        SELECT $[event_id], $[id]
        WHERE
        NOT EXISTS (
          SELECT * FROM interested WHERE event_id = $[event_id] AND user_id = $[id]);`,{event_id,id})
      .then(function () {
      // success;
      res.sendStatus(200);
      console.log("Interested Event Success");
      })
      .catch(function (error) {
      // error;
      console.log("Interested Event Fail");
      });
  }
  else{

    db1.none(`
        DELETE FROM interested
        WHERE event_id = $[event_id] AND user_id = $[id];`,{event_id,id})
      .then(function () {
      // success;
      res.sendStatus(200);
      console.log("Deletion Interested Event Success");
      })
      .catch(function (error) {
      // error;
      console.log("Deletion Interested Event Fail");
      });

  }

});

module.exports = router;
