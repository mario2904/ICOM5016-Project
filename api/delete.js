const router = require('express').Router();
const cloudinary = require('cloudinary');
const db1 = require('../db');

router.delete('/student/:user_id', (req, res, next) => {
//   const { studentID } = req.params;
//
//   db1.task(function *(t) {
//     yield none(`
//       DELETE
//       FROM followed_associations
//       WHERE user_id = $[user_id]`, {user_id});
//     yield none(`
//       DELETE
//       FROM interested
//       WHERE user_id = $[user_id]`, {user_id});
//
//     let { image_path } = yield t.one(`
//       DELETE
//       FROM images
//       WHERE image_id = (SELECT image_id FROM students WHERE user_id = $[user_id])
//       RETURNING image_path`, {user_id});
//     yield t.none(`
//       `)
//   })
//   .then(data => {
//
//   });
//   .catch(error => {
//
//   });
});

router.delete('/association/:association_id', (req, res, next) => {

});
router.delete('/event/:event_id', (req, res, next) => {

});

module.exports = router;
