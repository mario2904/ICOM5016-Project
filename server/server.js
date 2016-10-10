const express = require('express');
const bodyParser = require('body-parser');
const multer  = require('multer');

const app = express();

// Models
const Student = require('./student');
const Association = require('./association');
const Event = require('./event');

// Utils
const uuid = require('node-uuid');
const validate = require('./validate');
const filter = require('./filter');

// File Uploaders
const imgUpload =  multer({ dest: './public/images/tmp', fileFilter: filter.image}).single('image');

// DB Testing
const db = {};
db.student = {};
db.association = {};
db.event = {};

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json())

// Setup port
app.set('port', (process.env.PORT || 5000));

// Setup path to static files
app.use(express.static(__dirname + '/public'));

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
  for (let key in db[account]) {
    if ( db[account][key].email === email && db[account][key].password === password) {
      id = key;
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
  for (let key in db.association) {
    if ( db.association[key].email === email) {
      return res.status(400).send('Error: There is already an association with the same e-mail account');
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
//    department: string
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
  const { firstName, lastName, department, email, password } = req.body;
  // TODO: check the db and see if it it can create new student account
  // ... (Check if e-mail is already registered)
  //
  // Checking if there's already a student account with same email in the Testing db
  for (let key in db.student) {
    if ( db.student[key].email === email) {
      return res.status(400).send('Error: There is already a student with the same e-mail account');
    }
  }

  // Create new student account
  // Generate student id
  const id = uuid.v4();
  // Create new Student object model
  const newStudent = new Student(id, firstName, lastName, email, department, password);
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
//    startDate: string
//    endDate: string
//    startHour: string
//    endHour: string
//    location: string
//    image: string
app.post('/create-event', (req, res) => {
  console.log(req.body);
  if (!req.body)
    return res.sendStatus(400);
  // Check if has valid params in the body or the request
  else if (!validate.event(req.body))
    return res.status(400).send('Error: Missing fields for event.');
  // Destructure body params
  const { name, associationId, associationName, startDate, endDate, startHour, endHour, location, image } = req.body;

  // Create new event
  // Generate event id
  const id = uuid.v4();
  // Create new Student object model
  const newEvent = new Event(id, name, associationId, associationName, startDate, endDate, startHour, endHour, location, image);
  // TODO: Store it in the db ...
  // Store in Testing db
  db.event[id] = newEvent;
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

// GET - Get Student Info
// params:
//    id: uuid
// response:
//    firstName: string
//    lastName: string
//    department: string
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
  const { firstName, lastName, department, profileImage, bio } = student;
  const response = {
    firstName,
    lastName,
    department,
    profileImage,
    bio
  };
  // Send Student Information
  console.log('Success: Get Student Information');
  res.json(response);
});

app.listen(app.get('port'), function() {
  console.log('listening on port', app.get('port'), "...");
});
