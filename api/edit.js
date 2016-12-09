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

router.post('/student', (req, res, next) => {

});

router.post('/association', requireAuth, imgUpload.single('image_path'), (req, res, next) => {

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
    const { association_name, initials, location, page_link, bio } = req.body;
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
        console.log("Event Association Successful");
        res.sendStatus(200);
      })
      .catch(error => {
        console.log("Event Association Unsuccessful");
        next(error);
      });

  }));

});

router.post('/event', requireAuth, imgUpload.single('image_path'), (req, res, next) => {

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
    const { event_id, event_name, location, registration_link, description, start_date, end_date, start_time, end_time, categories } = req.body;
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
        console.log("Event Edit Successful");
        res.sendStatus(200);
      })
      .catch(error => {
        console.log("Event Edit Unsuccessful");
        next(error);
      });

  }));

});

module.exports = router;
