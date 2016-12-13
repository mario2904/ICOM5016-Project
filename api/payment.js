const router = require('express').Router();
const db1 = require('../db');
const passport = require('passport');
const requireAuth = passport.authenticate('jwt', {session: false});


router.post('/',requireAuth, (req, res, next) => {
  // Destructure params

console.log("FLAKJDSALKJ");
console.log(req.body);


});

module.exports = router;
