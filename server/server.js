const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// UUID generator
const uuid = require('node-uuid');

// Models
const Student = require('./student');
const Association = require('./association');
const validate = require('./validate');

// DB Testing
const db = {};
db.student = {};
db.association = {};

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

app.listen(app.get('port'), function() {
  console.log('listening on port', app.get('port'), "...");
});
