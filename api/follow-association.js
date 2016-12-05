const router = require('express').Router();
const db1 = require('../db');
const passport = require('passport');
const requireAuth = passport.authenticate('jwt', {session: false});


router.post('/', requireAuth, (req, res, next) => {
  console.log("FOLLOW ASSOCIATION (POST)");
  // Destructure params
  const { id } = req.user;
  const { association_id, action } = req.body;
  console.log(id);
  console.log(association_id);
  console.log(typeof action);
  // If action is true, it means the user is interested in the event
  if (action === true) {
    db1.none(`
      INSERT INTO followed_associations (association_id, user_id)
      SELECT $[association_id], $[id]
      WHERE
      NOT EXISTS (
        SELECT *
        FROM followed_associations
        WHERE association_id = $[association_id] AND user_id = $[id]);`,{association_id,id})
      .then(function () {
      // success;
      console.log("Followed Association Sucessfully");
      return res.json({isFollowing: true});
      })
      .catch(function (error) {
      // error;
      console.log("Unsuccessfully Followed Association");
      next(error);
      });
  }
  else {

    db1.none(`
        DELETE FROM followed_associations
        WHERE association_id = $[association_id] AND user_id = $[id];`,{association_id,id})
      .then(function () {
      // success;
      console.log("Deletion Followed Association Success");
      return res.json({isFollowing: false});
      })
      .catch(function (error) {
      // error;
      console.log("Deletion Followed Association Fail");
      next(error);
      });

  }

});

router.get('/:association_id', requireAuth, (req, res, next) => {
  console.log("FOLLOW ASSOCIATION (GET)");
  // Destructure params
  const { id } = req.user;
  const { association_id } = req.params;

  db1.oneOrNone(`
    SELECT *
    FROM followed_associations
    WHERE user_id = $[id] AND association_id = $[association_id]`, {id, association_id})
    .then(function(data) {
      if(!data) { return res.json({isFollowing: false}); }
      return res.json({isFollowing: true});
    })
    .catch(function(error) {
      console.log("Error: Follow Association (GET)");
      next(error);
    })
});


module.exports = router;
