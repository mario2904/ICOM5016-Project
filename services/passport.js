const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');

const db = require('../db');

// Setup options for Local Strategy
const localOptions = {
  usernameField: 'email'
}

// Create Local Strategy
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
  // Verify this email and password, call done with the user
  // if it is the correct email and password
  // otherwise, call done with false
  console.log("Start LocalStrategy");

  // Second. Store hash password in the DB. Along with the rest of the student info
  db.oneOrNone(`
    SELECT *
    FROM account
    WHERE email = $[email]`, {email})
    .then(function(data) {
      console.log("LocalStrategy: THEN", data);
      // No account found with given email
      if (!data) { return done(null, false); }
      // If account exist, compare passwords.

      // bcrypt.compare(password, data.password, function(err, res) {
      //   if (err) { return done(err); }
      //   // return account_id
      //   return done(null, {account_id: data.account_id});
      // });

      // For testing with plain text passwords.
      if (password !== data.password) { return done(null, false); }
      console.log("LocalStrategy: password Correct");
      return done(null, {account_id: data.account_id});
    })
    .catch(function(error) {
      // error in the db query
      console.log("LocalStrategy: Error catch");
      return done(error);
    });
});

// Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.SECRET_KEY || 'SECRET'
};

// Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // See if the user ID exists in the db
  // If it does, call 'done'
  // else, call done without a user object
});

// Tell Passport to use this Strategy
passport.use(jwtLogin);
passport.use(localLogin);
