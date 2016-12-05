const login = require('./login');
const admin = require('./admin');
const create = require('./create');
const event = require('./event');
const student = require('./student');
const association = require('./association');
const home_student = require('./home-student');
const home_association = require('./home-association');
const passportService = require('../services/passport');
const interested_event = require('./interested-event');
const follow_association = require('./follow-association')

const router = require('express').Router();

router.use('/login', login);
router.use('/admin', admin);
router.use('/create', create);
router.use('/event', event);
router.use('/student', student);
router.use('/association', association);
router.use('/home-student', home_student);
router.use('/home-association', home_association);
router.use('/interested-event', interested_event);
router.use('/follow-association',follow_association);


module.exports = router;
