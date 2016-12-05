const router = require('express').Router();
const db1 = require('../db');
const passport = require('passport');
const requireAuth = passport.authenticate('jwt', {session: false});


router.post('/', requireAuth ,  (req, res, next) => {
  console.log("hello");
  // Destructure params
  const { id } = req.user;
  const { association_id, action } = req.body;
  console.log(id);
  console.log(association_id);
  // If action is true, it means the user is interested in the event
  if (action === 'true'){
    db1.none(`
      INSERT INTO followed_associations (association_id, user_id)
      SELECT $[association_id], $[id]
      WHERE
      NOT EXISTS (
        SELECT * FROM followed_associations WHERE association_id = $[association_id] AND user_id = $[id]);`,{association_id,id})
      .then(function () {
      // success;
      res.sendStatus(200);
      console.log("Followed Association Sucessfully");
      })
      .catch(function (error) {
      // error;
      console.log("Unsuccessfully Followed Association");
      });
  }
  else{

    db1.none(`
        DELETE FROM followed_associations
        WHERE association_id = $[association_id] AND user_id = $[id];`,{association_id,id})
      .then(function () {
      // success;
      res.sendStatus(200);
      console.log("Deletion Followed Association Success");
      })
      .catch(function (error) {
      // error;
      console.log("Deletion Followed Association Fail");
      });

  }

});

module.exports = router;
