const router = require('express').Router();
const db1 = require('../db');
const passport = require('passport');
const requireAuth = passport.authenticate('jwt', {session: false});


router.post('/', requireAuth ,  (req, res, next) => {
  console.log("hello");
  // Destructure params
  const { id } = req.user;
  const { event_id, review,rating } = req.body;
  console.log(id);

    db1.none(`
      INSERT INTO review (event_id, user_id,review,rating,date_created)
    SELECT $[event_id], $[id], $[review], $[rating], CURRENT_TIMESTAMP`,{event_id,id,review,rating})
      .then(function () {
      // success;
      res.sendStatus(200);
      console.log("Review Added");
      })
      .catch(function (error) {
      // error;
      console.log("Review Failed");
      });

});

module.exports = router;
