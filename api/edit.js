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
const imgUpload = multer({ storage: multer.memoryStorage(), fileFilter: filter.image});

router.post('/student', requireAuth, imgUpload.single('image_path'), (req, res, next) => {

  const { id } = req.user;
  const { first_name, last_name, gender, hometown, college, major, bio } = req.body;
  // TODO: Validate all params except image_path

  // Check for image file
  if(!req.file) {
    console.log('No Image File passed.');
    db1.none(`
      UPDATE students
      SET first_name = $[first_name], last_name = $[last_name], gender = $[gender], hometown = $[hometown], college = $[college], major = $[major], bio = $[bio], image_id = $[image_id]
      WHERE user_id = $[id]`, {first_name, last_name, gender, hometown, college, major, bio, image_id, id})
      .then(data => {
        console.log("Edit Student Successful");
        res.sendStatus(200);
      })
      .catch(error => {
        console.log("Edit Student Unsuccessful");
        next(error);
      });
  }
  else {

    // Store image file in the cloud...
    const bufferStream = new stream.PassThrough();
    bufferStream.end(req.file.buffer);
    bufferStream.pipe(cloudinary.uploader.upload_stream(result => {
      console.log('upload: ',result);
      // use only the public url of image to store in the db.
      const image_path = result.secure_url;

      console.log(req.body);

      db1.task(function *(t) {
          //Add image to images Table
          let { image_id } = yield t.one(`
            INSERT INTO images (image_path)
            VALUES($[image_path])
            RETURNING image_id`,{image_path});
          // not affect is_live, timestamp
          return yield t.none(`
            UPDATE students
            SET first_name = $[first_name], last_name = $[last_name], gender = $[gender], hometown = $[hometown], college = $[college], major = $[major], bio = $[bio], image_id = $[image_id]
            WHERE user_id = $[id]`, {first_name, last_name, gender, hometown, college, major, bio, image_id, id});
        })
        .then(data => {
          console.log("Edit Student Successful");
          res.sendStatus(200);
        })
        .catch(error => {
          console.log("Edit Student Unsuccessful");
          next(error);
        });

    }));
  }

});

router.post('/association', requireAuth, imgUpload.single('image_path'), (req, res, next) => {

  const { id } = req.user;
  const { association_name, initials, location, page_link, bio } = req.body;
  // TODO: Validate all params except image_path

  // Check for image file
  if(!req.file) {
    console.log('No Image File passed.');
    db1.none(`
      UPDATE associations
      SET association_name = $[association_name], initials = $[initials], page_link = $[page_link], bio = $[bio], location_id = (SELECT location_id FROM location WHERE room = $[location])
      WHERE association_id = $[id]`, {association_name, initials, location, page_link, bio, id})
      .then(data => {
        console.log("Edit Association Successful");
        res.sendStatus(200);
      })
      .catch(error => {
        console.log("Edit Association Unsuccessful");
        next(error);
      });

  }
  else {

    // Store image file in the cloud...
    const bufferStream = new stream.PassThrough();
    bufferStream.end(req.file.buffer);
    bufferStream.pipe(cloudinary.uploader.upload_stream(result => {
      console.log('upload: ',result);
      // use only the public url of image to store in the db.

      const image_path = result.secure_url;
      console.log(req.body);

      db1.task(function *(t) {
          //Add image to images Table
          let { image_id } = yield t.one(`
            INSERT INTO images (image_path)
            VALUES($[image_path])
            RETURNING image_id`,{image_path});
          // not affect is_live, timestamp
          return yield t.none(`
            UPDATE associations
            SET association_name = $[association_name], initials = $[initials], page_link = $[page_link], bio = $[bio], location_id = (SELECT location_id FROM location WHERE room = $[location]), image_id = $[image_id]
            WHERE association_id = $[id]`, {association_name, initials, location, page_link, bio, image_id, id});
        })
        .then(data => {
          console.log("Edit Association Successful");
          res.sendStatus(200);
        })
        .catch(error => {
          console.log("Edit Association Unsuccessful");
          next(error);
        });

    }));
  }

});

router.post('/event', requireAuth, imgUpload.single('image_path'), (req, res, next) => {

  const { id } = req.user;
  const { event_id, event_name, location, registration_link, description, start_date, end_date, start_time, end_time, categories } = req.body;

  // Check for image file
  console.log(req.file);
  if(!req.file) {
    console.log('No Image File passed.');
    db1.task(function *(t) {
      // not affect is_live, timestamp
      yield t.none(`
        UPDATE events
        SET event_name = $[event_name], location_id = (SELECT location_id FROM location WHERE room = $[location]), registration_link = $[registration_link], description = $[description], start_date = $[start_date], end_date = $[end_date], start_time = $[start_time], end_time = $[end_time]
        WHERE event_id = $[event_id]`, {event_name, location, registration_link, description, start_date, end_date, start_time, end_time, event_id});
      // delete previous categories
      yield t.none(`
        DELETE
        FROM events_categories
        WHERE event_id = $[event_id]`, {event_id});
      return yield t.batch(categories.map(category_name => t.none(`
          INSERT INTO events_categories (event_id,category_id)
          VALUES ($[event_id], (SELECT category_id FROM category WHERE category_name = $[category_name]) )`, {event_id, category_name})
      ));
    })
    .then(data => {
      console.log("Edit Event Successful");
      res.sendStatus(200);
    })
    .catch(error => {
      console.log("Edit Event Unsuccessful");
      next(error);
    });

  }
  else {
    // Store image file in the cloud...
    const bufferStream = new stream.PassThrough();
    bufferStream.end(req.file.buffer);
    bufferStream.pipe(cloudinary.uploader.upload_stream(result => {
      console.log('upload: ',result);
      // use only the public url of image to store in the db.

      const image_path = result.secure_url;

      console.log(req.body);

      // TODO: Optimize parallel. not all are dependant of each other.
      db1.task(function *(t) {
          //Add image to images Table
          let { image_id } = yield t.one(`
            INSERT INTO images (image_path)
            VALUES($[image_path])
            RETURNING image_id`,{image_path});
          // not affect is_live, timestamp
          yield t.none(`
            UPDATE events
            SET event_name = $[event_name], location_id = (SELECT location_id FROM location WHERE room = $[location]), registration_link = $[registration_link], description = $[description], start_date = $[start_date], end_date = $[end_date], start_time = $[start_time], end_time = $[end_time], image_id = $[image_id]
            WHERE event_id = $[event_id]`, {event_name, location, registration_link, description, start_date, end_date, start_time, end_time, image_id, event_id});
          // delete previous categories
          yield t.none(`
            DELETE
            FROM events_categories
            WHERE event_id = $[event_id]`, {event_id});
          return yield t.batch(categories.map(category_name => t.none(`
              INSERT INTO events_categories (event_id,category_id)
              VALUES ($[event_id], (SELECT category_id FROM category WHERE category_name = $[category_name]) )`, {event_id, category_name})
          ));
        })
        .then(data => {
          console.log("Edit Event Successful");
          res.sendStatus(200);
        })
        .catch(error => {
          console.log("Edit Event Unsuccessful");
          next(error);
        });

    }));
  }

});

module.exports = router;
