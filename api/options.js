const router = require('express').Router();
const db1 = require('../db');

router.get('/sponsor', (req, res, next) => {
  db1.many(`
    SELECT sponsor_name, sponsor_id
    FROM sponsors`)
    .then(data => {
      console.log('Success: Fetch sponsor options.');
      res.json({sponsor_options: data});
    })
    .catch(error => {

    });

});

module.exports = router;
