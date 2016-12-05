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

  db.oneOrNone(`
    SELECT *
    FROM account
    WHERE email = $[email]`, {email})
    .then(function(data) {
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
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: process.env.SECRET_KEY || 'SECRET'
};

// Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // See if the user ID exists in the db
  // If it does, call 'done'
  // else, call done without a user object

  console.log("Start JwtStrategy");

  let table = '';
  let name = '';
  let id = '';
  switch (payload.role) {
    case 'student':
      id = 'user_id'
      table = 'students';
      break;
    case 'association':
      id = 'association_id';
      table = 'associations';
      break;
    default:
      return res.status(400).send("Error: Login error. Role undefined.");
  }

  db.oneOrNone(`
    SELECT *
    FROM account natural join ${table}
    WHERE ${id} = $[token_id]`, {token_id: payload.sub})
    .then(function(data) {
      if(!data) { return done(null, false); }
      console.log('JWT Strategy: auth successful');
      return done(null, {id: payload.sub})
    })
    .catch(function(error) {
      console.log('JWT Strategy: auth failed');
      return done(error, false);
    });

});

// Tell Passport to use this Strategy
passport.use(jwtLogin);
passport.use(localLogin);
