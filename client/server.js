// Express
const express = require('express');
const bodyParser = require('body-parser');
const multer  = require('multer');
const cors = require('cors');

// Webpack
const path = require('path');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');

const app = express();

// Models
const { Association, Student, Event } = require('./model');

// Utils
const uuid = require('node-uuid');
const validate = require('./utils/validate');
const filter = require('./utils/filter');

// API Routes
const apiRoutes = require('./api');

// File Uploaders
const imgUpload = multer({ dest: './public/images/tmp', fileFilter: filter.image}).single('image');

// Testing
const test = require('./test');
// Create Testing db
const db = {};
// Set Schema
test.createSchema(db);
// Fill testing db with dummy data
test.fillDummyData(db);

// Add Middleware Express
// Allow Cross-Origin Resource Sharing (CORS)
app.use(cors());
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// Parse application/json
app.use(bodyParser.json())

// Setup path to static files
app.use(express.static(__dirname + '/public'));
console.log("Hi");

// Handle api calls ------------------------------------------------------------


// POST - Login
// body:
//    email: string
//    password: string
//    account: string (association | student)
// response:
//    id: uuid
app.post('/login', (req, res) => {
  console.log(req.body);
  if (!req.body)
    return res.sendStatus(400);
  // Check if has valid params in the body or the request
  else if (!validate.login(req.body))
    return res.status(400).send('Error: Missing fields for login.');
  // Destructure body params
  const { email, password, account } = req.body;
  let id = '';
  // TODO: Check if it matches one record in the db
  //
  // Check the db Testing and see if it mathces ...
  for (var key in db[account]) {
    if (db[account].hasOwnProperty(key)) {
      // Need to match both email and password
      if ( db[account][key].email === email && db[account][key].password === password) {
        id = key;
      }
    }
  }
  // Return error if there was no match in the db
  if (id === '')
    return res.status(400).send('Error: E-mail or Password is Incorrect');
  // Send their id
  const response = {id};
  res.json(response);
});

// POST - Sign Up Association
// body:
//    name: string
//    initials: string
//    location: string
//    link: string
//    email: string
//    password: string
app.post('/create-association', (req, res) => {
  console.log(req.body);
  if (!req.body)
    return res.sendStatus(400);
  // Check if has valid params in the body or the request
  else if (!validate.association(req.body))
    return res.status(400).send('Error: Missing fields for association.');
  // Destructure body params
  const { name, initials, location, link, email, password } = req.body;
  // TODO: check the db and see if it it can create new association account
  // ... (Check if e-mail is already registered)
  //
  // Checking if there's already an association account with same email in the Testing db
  for (var key in db.association) {
    if (db.association.hasOwnProperty(key)) {
      if ( db.association[key].email === email) {
        return res.status(400).send('Error: There is already an association with the same e-mail account');
      }
    }
  }
  // Create new association account
  // Generate association id
  const id = uuid.v4();
  // Create new Association object model
  const newAssociation = new Association(id, name, initials, location, link, email, password);
  // TODO: Store it in the db ...
  // Store in Testing db
  db.association[id] = newAssociation;
  // Send OK status
  console.log('Success: Create Association');
  console.log('Association ID:', id);
  res.sendStatus(200);
});

// POST - Sign Up Student
// body:
//    firstName: string
//    lastName: string
//    age: number
//    gender: string
//    hometown: string
//    college: string
//    major: string
//    email: string
//    password: string
app.post('/create-student', (req, res) => {
  console.log(req.body);
  if (!req.body)
    return res.sendStatus(400);
  // Check if has valid params in the body or the request
  else if (!validate.student(req.body))
    return res.status(400).send('Error: Missing fields for student.');
  // Destructure body params
  const { firstName, lastName, age, gender, hometown, college, major, email, password } = req.body;
  // TODO: check the db and see if it it can create new student account
  // ... (Check if e-mail is already registered)
  //
  // Checking if there's already a student account with same email in the Testing db
  for (var key in db.student) {
    if (db.student.hasOwnProperty(key)) {
      if ( db.student[key].email === email) {
        return res.status(400).send('Error: There is already a student with the same e-mail account');
      }
    }
  }

  // Create new student account
  // Generate student id
  const id = uuid.v4();
  // Create new Student object model
  const newStudent = new Student(id, firstName, lastName, age, gender, hometown, college, major, email, password);
  // TODO: Store it in the db ...
  // Store in Testing db
  db.student[id] = newStudent;
  // Send OK status
  console.log('Success: Create Student');
  console.log('Student ID:', id);
  res.sendStatus(200);
});

// POST - Create Event
// body:
//    name: string
//    associationId: string
//    associationName: string
//    startDate: date
//    endDate: date
//    startHour: string
//    endHour: string
//    location: string
//    image: string
//    description: string
app.post('/create-event', (req, res) => {
  console.log(req.body);
  if (!req.body)
    return res.sendStatus(400);
  // Check if has valid params in the body or the request
  else if (!validate.event(req.body))
    return res.status(400).send('Error: Missing fields for event.');
  // Destructure body params
  const { name, associationId, associationName, startDate, endDate, startHour, endHour, location, image, description } = req.body;

  // Create new event
  // Generate event id
  const id = uuid.v4();
  // Create new Student object model
  const newEvent = new Event(id, name, associationId, associationName, startDate, endDate, startHour, endHour, location, image, description);
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

// POST - Upload Image (SINGLE)
// file:
//    image: <image>
// In case you need to handle a text-only multipart form, you can
// use any of the multer methods (.single(), .array(), fields()).
app.post('/upload-image', (req, res) => {
  imgUpload(req, res, function (err) {
    if (err) {
      // An error occurred when uploading
      return res.status(400).send(err.message);
    }
    // Everything went fine
    // Get path to uploaded file (drop the 'public/')
    const path = req.file.path.slice(req.file.path.indexOf('/'));
    const response = {image: path};
    // Send path to uploaded file
    console.log('Success: Image Upload');
    console.log('Image Path:', req.file.path);
    res.json(response);
  });
});

// GET - Get All Students Info
// response:
//    [] student:
//        firstName: string
//        lastName: string
//        major: string
//        interestedEvents: [] uuid
//        followedAssociations: [] uuid
//        profileImage: string
//        bio: string
app.get('/student/all', (req, res) => {
  const response = [];
  for (let id in db.student) {
    if (db.student.hasOwnProperty(id)) {
      // Destructure student information
      const { firstName, lastName, age, gender, hometown, college, major, profileImage, bio } = db.student[id];
      // TODO: Get extra information from the db
      //
      // Get extra information from the Testing db (other tables)
      const interestedEvents = db.interestedEvents[id] || [];
      const followedAssociations = db.followedAssociations[id] || [];
      const singleStudent = {
        firstName,
        lastName,
        age,
        gender,
        hometown,
        college,
        major,
        profileImage,
        bio,
        interestedEvents,
        followedAssociations
      };
      // Add single user to the response
      response.push(singleStudent);
    }
  }
  // Send All Students Information
  console.log('Success: Get All Students Information');
  res.json({students: response});
});

// GET - Get Student Info
// params:
//    id: uuid
// response:
//    firstName: string
//    lastName: string
//    major: string
//    interestedEvents: [] uuid
//    followedAssociations: [] uuid
//    profileImage: string
//    bio: string
app.get('/student/:id', (req, res) => {
  console.log(req.params);
  // Destructure params
  const { id } = req.params;
  // TODO: Check if it is in the db...
  //
  // Check if it is in the Testing db
  const student = db.student[id];
  if (student === undefined)
    return res.status(400).send('Error: Student not found in the DB.');
  // Destructure student information
  const { firstName, lastName, age, gender, hometown, college, major, profileImage, bio } = student;
  // TODO: Get extra information from the db
  //
  // Get extra information from the Testing db (other tables)
  const interestedEvents = db.interestedEvents[id] || [];
  const followedAssociations = db.followedAssociations[id] || [];

  const response = {
    firstName,
    lastName,
    age,
    gender,
    hometown,
    college,
    major,
    profileImage,
    bio,
    interestedEvents,
    followedAssociations
  };
  // Send Student Information
  console.log('Success: Get Student Information');
  res.json(response);
});

// GET - All Associations Information
// response:
//    [] association
//        name: string
//        initials: string
//        location: string
//        link: string
//        email: string
//        profileImage: string
//        bio: string
//        sponsors: [] uuid
//        activeEvents: [] uuid
//        pastEvents: [] uuid
//        followers: [] uuid
app.get('/association/all', (req, res) => {
  const response = [];
  for (var id in db.association) {
    if (db.association.hasOwnProperty(id)) {
      // Destructure association information
      const { name, initials, location, link, email, profileImage, bio } = db.association[id];
      // TODO: Get extra information from the db
      //
      // Get extra information from the Testing db (other tables)
      const sponsors = db.associationSponsors[id] || [];
      const activeEvents = db.activeEvents[id] || [];
      const pastEvents = db.pastEvents[id] || [];
      const followers = db.followers[id] || [];

      const singleAssociation = {
        name,
        initials,
        location,
        link,
        email,
        profileImage,
        bio,
        sponsors,
        activeEvents,
        pastEvents,
        followers
      }
      response.push(singleAssociation);
    }
  }

  // Send All Associations Information
  console.log('Success: Get All Associations Information');
  res.json({associations: response})
});

// GET - Association Information
// params:
//    id: uuid
// response
//    name: string
//    initials: string
//    location: string
//    link: string
//    email: string
//    profileImage: string
//    bio: string
//    sponsors: [] uuid
//    activeEvents: [] uuid
//    pastEvents: [] uuid
//    followers: [] uuid
app.get('/association/:id', (req, res) => {
  console.log(req.params);
  // Destructure params
  const { id } = req.params;
  // TODO: Check if it is in the db...
  //
  // Check if it is in the Testing db
  const association = db.association[id];
  if (association === undefined)
    return res.status(400).send('Error: Association not found in the DB.');
  // Destructure association information
  const { name, initials, location, link, email, profileImage, bio } = association;
  // TODO: Get extra information from the db
  //
  // Get extra information from the Testing db (other tables)
  const sponsors = db.associationSponsors[id] || [];
  const activeEvents = db.activeEvents[id] || [];
  const pastEvents = db.pastEvents[id] || [];
  const followers = db.followers[id] || [];

  const response = {
    name,
    initials,
    location,
    link,
    email,
    profileImage,
    bio,
    sponsors,
    activeEvents,
    pastEvents,
    followers
  }
  // Send Association Information
  console.log('Success: Get Association Information');
  res.json(response)
});

// GET - Event Information
// response:
//    [] event
//        name: string
//        associationId: uuid
//        associationName: string
//        startDate: date
//        endDate: date
//        startHour: time
//        endHour: time
//        location: string
//        image: string
//        description: string
app.get('/event/all', (req, res) => {
  const response = [];
  for (var id in db.event) {
    if (db.event.hasOwnProperty(id)) {
      // Destructure event information
      const { name, associationId, associationName, startDate, endDate, startHour, endHour, location, image, description } = db.event[id];
      // TODO: Get extra information from the db
      //
      // Get extra information from the Testing db (other tables)
      // The list of students interested of going.

      const singleEvent = {
        name,
        associationId,
        associationName,
        startDate,
        endDate,
        startHour,
        endHour,
        location,
        image,
        description
      }

      response.push(singleEvent);
    }
  }

  // Send Event Information
  console.log('Success: Get Event Information');
  res.json({events: response});
});

// GET - Event Information
// params:
//    id: uuid
// response:
//    name: string
//    associationId: uuid
//    associationName: string
//    startDate: date
//    endDate: date
//    startHour: time
//    endHour: time
//    location: string
//    image: string
//    description: string
app.get('/event/:id', (req, res) => {
  console.log(req.params);
  // Destructure params
  const { id } = req.params;
  // TODO: Check if it is in the db...
  //
  // Check if it is in the Testing db
  const event = db.event[id];
  if (event === undefined)
    return res.status(400).send('Error: Event not found in the DB.');
  // Destructure event information
  const { name, associationId, associationName, startDate, endDate, startHour, endHour, location, image, description } = event;
  // TODO: Get extra information from the db
  //
  // Get extra information from the Testing db (other tables)
  // The list of students interested of going.

  const response = {
    name,
    associationId,
    associationName,
    startDate,
    endDate,
    startHour,
    endHour,
    location,
    image,
    description
  }
  // Send Event Information
  console.log('Success: Get Event Information');
  res.json(response);
});


// -----------------------------------------------------------------------------
// Webpack configurations ...
const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;

if (isDeveloping) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get('*', function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
    res.end();
  });
} else {
  app.use(express.static(__dirname + '/dist'));
  app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}

app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
