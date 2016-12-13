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
const post_review = require('./post-review');
const post_update = require('./post-update');
const edit = require('./edit');
const options = require('./options');
const payment = require('./payment');
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
router.use('/follow-association', follow_association);
router.use('/post-review', post_review);
router.use('/post-update', post_update);
router.use('/edit', edit);
router.use('/options', options);
router.use('/payment', payment);


module.exports = router;
