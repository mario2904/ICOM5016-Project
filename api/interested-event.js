const router = require('express').Router();
const db1 = require('../db');

router.post('/:id', (req, res) => {
  console.log(req.params);
  // Destructure params
  const { id } = req.params;
  // TODO: Check if it is in the db...
  const responseDB = {};



});

module.exports = router;
