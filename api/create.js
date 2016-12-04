const bcrypt = require('bcrypt');
const router = require('express').Router();
const db1 = require('../db');
const validate = require('../utils/validate');

router.post('/student',  (req, res, next) => {
  console.log(req.body);
  // Check if has valid params in the body or the request
  if (!req.body || !validate.student(req.body))
    return res.status(400).send('Error: Missing fields for student.');
  // Destructure body params
  const { first_name, last_name, birthdate, gender, hometown, college, major, email, password, bio } = req.body;
  console.log("Before query");
  // Check if there's already a student account with same email in the db
  db1.oneOrNone(`
    SELECT *
    FROM account
    WHERE email = $[email]`, {email})
    .then(function(data) {
      // If there exist an account with the same email. Return error.
      if(data)
        return res.status(422).send('Error: email is in use');

      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth();
      var day = date.getDate();
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var seconds = date.getSeconds();
      var milliseconds = date.getMilliseconds();

      const dateCreated = new Date(year, month, day, hours, minutes, seconds, milliseconds);
      console.log(dateCreated);
      db1.none(`
        WITH acc1 AS (
          INSERT INTO account (email, password,receive_notifications,date_created)
          VALUES ($[email], $[password],'no',CURRENT_TIMESTAMP)
          RETURNING account_id
        )
        INSERT INTO students (first_name,last_name,hometown,college,major,gender,bio,birthdate,account_id)
        SELECT $[first_name],$[last_name], $[hometown], $[college], $[major], $[gender], $[bio],to_timestamp($[birthdate], 'dd-mm-yyyy'), account_id
        FROM acc1`,{first_name, last_name, hometown, college, major, gender, bio, email, password, birthdate})
        .then(function () {
        // success;
        res.sendStatus(200);
        console.log("WOOOOT");
        })
        .catch(function (error) {
        // error;
        console.log("MOOP");
        });




      // If there is no other acount with the same email. Create account.
      // First. hash password
      //bcrypt.hash(password, 10, function(err, hash) {

      //   if(err) { return next(err) }
      //   // Second. Store hash password in the DB. Along with the rest of the student info
      //   // TODO: implement!
      //
      //   // return res.sendStatus(200);
      //   // Send OK status
      //   console.log('Success: Create Student');
      //   return res.json({success: true});
      // });
    })
    .catch(function(error) {
      return next(error);
    });

});

router.post('/association', (req, res, next) => {
  console.log(req.body);
  if (!req.body || !validate.association(req.body))
    return res.status(400).send('Error: Missing fields for association.');
  // Destructure body params
  const { association_name, initials, location, page_link, email, password } = req.body;
  // TODO: check the db and see if it it can create new association account
  // ... (Check if e-mail is already registered)
  //
  // Check if there's already an association account with same email in the DB
  db1.oneOrNone(`
    SELECT *
    FROM account
    WHERE email = $[email]`, {email})
    .then(function(data) {
      // If there exist an account with the same email. Return error.
      if(data)
        return res.status(422).send('Error: email is in use');

      // If there is no other acount with the same email. Create account.
      // First. hash password
      bcrypt.hash(password, 10, function(err, hash) {
        if(err) { return next(err) }
        // Second. Store hash password in the DB. Along with the rest of the association info
        // TODO: implement!

        // return res.sendStatus(200);
        // Send OK status
        console.log('Success: Create Association');
        return res.json({success: true});
      });
    })
    .catch(function(error) {
      return next(error);
    });

});

router.post('/event', (req, res, next) => {
  console.log(req.body);
  // Check if has valid params in the body or the request
  if (!req.body || !validate.event(req.body))
    return res.status(400).send('Error: Missing fields for event.');
  // Destructure body params
  const { name, associationId, associationName, startDate, endDate, startTime, endTime, location, image, description, registrationLink } = req.body;

  // Create new event
  // Generate event id
  const id = uuid.v4();
  // Create new Student object model
  const newEvent = new Event(id, name, associationId, associationName, startDate, endDate, startTime, endTime, location, image, description, registrationLink);
  // TODO: Store it in the db ...
  //
  // Store in Testing db
  db.event[id] = newEvent;
  // Update activeEvents list for that association
  db.activeEvents[associationId] = [id].concat(db.activeEvents[associationId] || []);
  // Send OK status
  console.log('Success: Create Event');
  console.log('Event ID:', id);
  res.sendStatus(200);
});

module.exports = router;
