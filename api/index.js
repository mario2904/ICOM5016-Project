const admin = require('./admin');
const create = require('./create');
const home_student = require('./home-student');
const home_association = require('./home-association');


const router = require('express').Router();
const db1 = require('../db');

router.use('/admin', admin);
router.use('/create', create);
router.use('/home-student', home_student);
router.use('/home-association', home_association);




module.exports = router;
