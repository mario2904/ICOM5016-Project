const bcrypt = require('bcrypt');
const router = require('express').Router();
const db1 = require('../db');
const validate = require('../utils/validate');
const passport = require('passport');
const requireAuth = passport.authenticate('jwt', {session: false});

const filter = require('../utils/filter');
const cloudinary = require('cloudinary');
const stream = require('stream');
const multer = require('multer');
const welcome_student = require('../mail/welcome_student');
const imgUpload = multer({ storage: multer.memoryStorage(), fileFilter: filter.image});
// defaults
const default_image_id = 1;

router.post('/student', (req, res, next) => {
  console.log(req.body);
  // Check if has valid params in the body or the request
  if (!req.body || !validate.student(req.body))
    return res.status(400).send('Error: Missing fields for student.');
  // Destructure body params
  const { first_name, last_name, birthdate, gender, hometown, college, major, email, password, bio } = req.body;

  // TODO
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

  db1.task(function *(t) {
    let exist = yield t.oneOrNone(`
      SELECT *
      FROM account
      WHERE email = $[email]`, {email});
    if (exist) { return 401 }
    return yield t.none(`
      WITH acc1 AS (
        INSERT INTO account (email, password, receive_notifications, active, date_created)
        VALUES ($[email], $[password],false, true, CURRENT_TIMESTAMP)
        RETURNING account_id
      )
      INSERT INTO students (first_name,last_name,hometown,college,major,gender,bio,birthdate,account_id,image_id)
      SELECT $[first_name],$[last_name], $[hometown], $[college], $[major], $[gender], $[bio],to_timestamp($[birthdate], 'dd-mm-yyyy'), account_id, $[default_image_id]
      FROM acc1`,{first_name, last_name, hometown, college, major, gender, bio, email, password, birthdate, default_image_id});
  })
  .then(data => {
    console.log("Student Creation Successful");
    if(!data){
      welcome_student(first_name, last_name, college, email);
      res.sendStatus(200);
    }
    else {
      res.sendStatus(data);
    }

  })
  .catch(error => {
    console.log("Student Creation Unsuccessful");
    next(error);
  });

});

router.post('/association', (req, res, next) => {
  console.log(req.body);
  if (!req.body || !validate.association(req.body))
    return res.status(400).send('Error: Missing fields for association.');
  // Destructure body params
  const { association_name, initials, location, page_link, email, password, bio, sponsors } = req.body;
  // TODO: check the db and see if it it can create new association account
  // ... (Check if e-mail is already registered)

  // TODO
  // Check if there's already an association account with same email in the DB
  // If there is no other acount with the same email. Create account.
  // First. hash password
  // bcrypt.hash(password, 10, function(err, hash) {
  //   if(err) { return next(err) }
  //   // Second. Store hash password in the DB. Along with the rest of the association info
  //   // TODO: implement!
  //
  //   // return res.sendStatus(200);
  //   // Send OK status
  //   console.log('Success: Create Association');
  //   return res.json({success: true});
  // });
  db1.task(function *(t) {
    let exist = yield t.oneOrNone(`
      SELECT *
      FROM account
      WHERE email = $[email]`, {email});
    if (exist) { return 401 }
    let { association_id } = yield t.one(`
      WITH acc1 AS (
        INSERT INTO account (email, password, receive_notifications, active, date_created)
        VALUES ($[email], $[password], false, true, CURRENT_TIMESTAMP)
        RETURNING account_id
      )
      INSERT INTO associations (association_name, page_link, initials, bio, account_id, association_location, image_id)
      SELECT $[association_name],$[page_link],$[initials], $[bio], account_id, $[location] , $[default_image_id]
      FROM acc1
      RETURNING association_id`,{association_name, page_link, initials, location, bio, email, password, default_image_id});
      console.log(association_id);
    return yield t.batch(sponsors.map(sponsor_name => t.none(`
        INSERT INTO association_sponsors (association_id, sponsor_id)
        VALUES ($[association_id], (SELECT sponsor_id FROM sponsors WHERE sponsor_name = $[sponsor_name]) )`, {association_id, sponsor_name})
    ));

  })
  .then(data => {
    console.log("Association Creation Successful");
    console.log(data);
    if(data === 401) {
      res.sendStatus(data);
    }
    else {
      welcome_association(email, association_name);
      res.sendStatus(200);
    }

  })
  .catch(error => {
    console.log("Association Creation Unsuccessful");
    next(error);
  });

});

router.post('/event', requireAuth, imgUpload.single('image_path'), (req, res, next) => {
  console.log(req.body);
  // Check if has valid params in the body or the request
  // if (!req.body || !validate.event(req.body))
  //   return res.status(400).send('Error: Missing fields for event.');
  // Destructure body params
  // id is the association_id

  // Check for image file
  if(!req.file) {return next(new Error('no file'))}

  // Store image file in the cloud...
  const bufferStream = new stream.PassThrough();
  bufferStream.end(req.file.buffer);
  bufferStream.pipe(cloudinary.uploader.upload_stream(result => {
    console.log('upload: ',result);
    // use only the public url of image to store in the db.
    const { id } = req.user;
    const image_path = result.secure_url;
    const { event_name, is_live, location, registration_link, description, start_date, end_date, start_time, end_time, categories } = req.body;
    console.log(req.body);
    console.log(id);

    db1.task(function *(t) {
        //Add image to images Table
        let { image_id } = yield t.one(`
          INSERT INTO images (image_path)
          VALUES($[image_path])
          RETURNING image_id`,{image_path});
        let { event_id } = yield t.one(`
          INSERT INTO events (association_id, event_name, is_live, event_location, registration_link, description, start_date, end_date, start_time, end_time, time_stamp, image_id)
          VALUES ($[id], $[event_name], true, $[location], $[registration_link], $[description], $[start_date], $[end_date], $[start_time], $[end_time], CURRENT_TIMESTAMP, $[image_id])
          RETURNING event_id`, {id, event_name, is_live, location, registration_link, description, start_date, end_date,start_time, end_time, image_path, image_id});
        return yield t.batch(categories.map(category_name => t.none(`
            INSERT INTO events_categories (event_id,category_id)
            VALUES ($[event_id], (SELECT category_id FROM category WHERE category_name = $[category_name]) )`, {event_id, category_name})
        ));
      })
      .then(data => {
        console.log("Event Creation Successful");
        res.sendStatus(200);
      })
      .catch(error => {
        console.log("Event Creation Unsuccessful");
        next(error);
      });

  }));

});

module.exports = router;
