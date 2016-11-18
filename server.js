2// Express
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

// File Uploaders
const imgUpload = multer({ dest: './public/images/tmp', fileFilter: filter.image}).single('image');

// Testing
const test = require('./test');
// Create Testing db
const db = {};

var pgp = require('pg-promise')(/*options*/);
var db1 = pgp('postgres://postgres:postgres@localhost:8000/postgres');

db1.connect()
    .then(function (obj) {
        console.log('DB connection established.')
        obj.done(); // success, release the connection;
    })
    .catch(function (error) {
        console.log("ERROR:", error.message || error);
    });


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

// Handle REST API calls -------------------------------------------------------


// POST - Login
// body:
//    email: string
//    password: string
//    account: string (association | student)
// response:
//    id: uuid
app.post('/api/login', (req, res) => {
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
app.post('/api/create-association', (req, res) => {
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
  // Initialize association's active and past events Lists
  db.activeEvents[id] = [];
  db.pastEvents[id] = [];
  // Initialize association's Sponsors Lists
  db.associationSponsors[id] = [];
  // Initialize association's followers list
  db.followers[id] = [];
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
app.post('/api/create-student', (req, res) => {
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
  // Initialize student's interestedEvents list
  db.interestedEvents[id] = [];
  // Initialize student's followed associations list
  db.followedAssociations[id] = [];
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
//    startTime: string
//    endTime: string
//    location: string
//    image: string
//    description: string
//    registrationLink: string
app.post('/api/create-event', (req, res) => {
  console.log(req.body);
  if (!req.body)
    return res.sendStatus(400);
  // Check if has valid params in the body or the request
  else if (!validate.event(req.body))
    return res.status(400).send('Error: Missing fields for event.');
  // Destructure body params
  const { name, associationId, associationName, startDate, endDate, startTime, endTime, location, image, description, registrationLink } = req.body;

  // Create new event
  // Generate event id
  const id = uuid.v4();
  // Create new Student object model
  const newEvent = new Event(id, name, associationId, associationName, startDate, endDate, startTime, endTime, location, image, description, registrationLink);
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
app.post('/api/upload-image', (req, res) => {
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
//        id: uuid
//        firstName: string
//        lastName: string
//        major: string
//        interestedEvents: [] uuid
//        followedAssociations: [] uuid
//        profileImage: string
//        bio: string
app.get('/api/student/all', (req, res) => {
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
        id,
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
app.get('/api/student/:id', (req, res) => {
  console.log(req.params);
  // Destructure params
  const { id } = req.params;
  // TODO: Check if it is in the db...
  const responseDB = {};
  //
  db1.one("SELECT first_name, last_name, gender, hometown, college, major, image_path, bio, email \
            FROM students natural join account natural join images \
            WHERE user_id = ${idused}", {idused: id})
      .then(function (data) {
          // success;
          responseDB.eventInfo = data;
          db1.any("SELECT event_id, event_name, association_name, start_date, end_date, start_time, end_time, room, image_path \
                    FROM interested natural join events natural join images natural join location, associations \
                    WHERE user_id = ${idused} and events.association_id = associations.association_id", {idused: id})
              .then(function (data) {
                  // success;
                  responseDB.interestedEvents = data;
                  db1.any("SELECT association_id, association_name, initials, image_path \
                            FROM followed_associations natural join associations natural join images \
                            WHERE user_id = ${idused}", {idused: id})
                      .then(function (data) {
                          // success;
                          responseDB.followedAssociations = data;
                          const { first_name, last_name, gender, hometown, college, major, image_path, bio, email } = responseDB.eventInfo;
                          const response = {
                            first_name,
                            last_name,
                            gender,
                            hometown,
                            college,
                            major,
                            image_path,
                            bio,
                            email,
                            interestedEvents: responseDB.interestedEvents,
                            followedAssociations: responseDB.followedAssociations
                          };
                          // Send Student Information
                          console.log('Success: Get Student Information');
                          console.log("DB");
                          console.log(response);

                          res.json(response);


                          console.log('worked');
                      })
                      .catch(function (error) {
                          // error;
                          console.log('Error: Followed Associations')
                      });

                  console.log('worked');
              })
              .catch(function (error) {
                  // error;
                  console.log('Error: Interested Events')
              });

          console.log('worked');
      })
      .catch(function (error) {
          // error;
          console.log('Error Student Information')
      });



  // if (student === undefined)
  //   return res.status(400).send('Error: Student not found in the DB.')

});

// GET - All Associations Information
// response:
//    [] association
//        id: uuid
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
app.get('/api/association/all', (req, res) => {
  const response = [];
  db1.any("SELECT association_id, association_name, initials, room, page_link, email, image_path, bio \
          FROM associations natural join account natural join images natural join location", [true])
      .then(function (data) {
          // success;

          for (let i = 0; i<data.length;i++) {

              // Destructure association information
              const { association_id, association_name, initials, room, page_link, email, image_path, bio } = data[i];
              // TODO: Get extra information from the db
              //
              // Get extra information from the Testing db (other tables)


              const singleAssociation = {

                association_id,
                association_name,
                initials,
                room,
                page_link,
                email,
                image_path,
                bio

              }
              response.push(singleAssociation);

          }

          // Send All Associations Information
          console.log('Success: Get All Associations Information');
          res.json({associations: response})
          //console.log(data[0])
          console.log('worked')
      })
      .catch(function (error) {
          // error;
          console.log('no function')
      });

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
app.get('/api/association/:id', (req, res) => {
  console.log(req.params);
  // Destructure params
  const { id } = req.params;
  // TODO: Check if it is in the db...
  //
const responseDB = {};

  db1.one("SELECT association_name, initials, room, page_link, email, image_path, bio \
          FROM associations natural join account natural join images natural join location\
          WHERE association_id = ${idused}", {idused: id})
      .then(function (data) {
          // success;
          responseDB.associationInfo = data
          db1.any("SELECT event_id, E.event_name, A.association_name, A.association_id, start_date, end_date, start_time, end_time, room, image_path, description, registration_link \
            FROM events as E, associations as A, images as I, location as L \
            WHERE E.association_id = A.association_id and E.image_id = I.image_id and E.location_id = L.location_id and A.association_id = ${idused} and is_live = 'yes'", {idused: id})
              .then(function (data) {
                responseDB.activeEvents = data;

                db1.any("SELECT event_id, E.event_name, A.association_name, A.association_id, start_date, end_date, start_time, end_time, room, image_path, description, registration_link \
                  FROM events as E, associations as A, images as I, location as L \
                  WHERE E.association_id = A.association_id and E.image_id = I.image_id and E.location_id = L.location_id and A.association_id = ${idused} and is_live = 'no'", {idused: id})
                    .then(function (data) {
                      responseDB.pastEvents = data;
                      db1.any("SELECT sponsor_name, image_path \
                          FROM association_sponsors natural join sponsors natural join images\
                          WHERE association_id = ${idused}", {idused: id})
                          .then(function (data) {
                            responseDB.sponsors = data;
                            db1.one("SELECT count(user_id) \
                                      FROM followed_associations \
                                      WHERE association_id = ${idused}", {idused: id})
                                .then(function (data) {
                                  responseDB.amountFollowed = data

                                  const { association_name, initials, room, page_link, email, image_path, bio } = responseDB.associationInfo;
                                  const response = {

                                    association_name,
                                    initials,
                                    room,
                                    page_link,
                                    email,
                                    image_path,
                                    bio,
                                    activeEvents: responseDB.activeEvents,
                                    pastEvents: responseDB.pastEvents,
                                    sponsors: responseDB.sponsors,
                                    followers: responseDB.amountFollowed

                                  }

                                  console.log('Success: Get All Associations Information');
                                  console.log(response);
                                  res.json(response);
                                  console.log('worked');
                                })
                                .catch(function (error) {
                                    // error;
                                    console.log('Error: Followers')
                                });

                          })
                          .catch(function (error) {
                              // error;
                              console.log('Error: Sponsors')
                          });

                    })
                    .catch(function (error) {
                        // error;
                        console.log('Error: PastEvents')
                    });

              })
              .catch(function (error) {
                  // error;
                  console.log('Error: LiveEvents')
              });


      })
      .catch(function (error) {
          // error;
          console.log('Error: Get AssociationInfo')
      });



});

// GET - Event Information
// response:
//    [] event
//        id: uuid
//        name: string
//        associationId: uuid
//        associationName: string
//        startDate: date
//        endDate: date
//        startTime: time
//        endTime: time
//        location: string
//        image: string
//        description: string
//        registrationLink: string
app.get('/api/event/all', (req, res) => {
  const response = [];

  db1.any("SELECT event_id, E.event_name, A.association_name, A.association_id, start_date, end_date, start_time, end_time, room, image_path, description, registration_link \
            FROM events as E, associations as A, images as I, location as L \
            WHERE E.association_id = A.association_id and E.image_id = I.image_id and E.location_id = L.location_id", [true])
      .then(function (data) {
          // success;
          console.log(data);
          for (let i = 0; i<data.length;i++) {

              // Destructure association information

              const { event_id, event_name, association_id, association_name, start_date, end_date, start_time, end_time, room, image_path, description, registration_link } = data[i];
              // TODO: Get extra information from the db
              //
              // Get extra information from the Testing db (other tables)
              // The list of student s interested of going.

              const singleEvent = {

                event_id,
                event_name,
                association_id ,
                association_name,
                start_date,
                end_date,
                start_time,
                end_time,
                room,
                image_path,
                description,
                registration_link

              }

              response.push(singleEvent);


          }

            // Send Event Information
            console.log('Success: Get Event Information');
            res.json({events: response});
          //console.log(data[0])
          console.log('worked')
      })
      .catch(function (error) {
          // error;
          console.log('no function')
      });
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
//    startTime: time
//    endTime: time
//    location: string
//    image: string
//    description: string
//    registrationLink: string
app.get('/api/event/:id', (req, res) => {
  console.log(req.params);
  // Destructure params
  const { id } = req.params;
  const responseDB = {};
  const eventInfo = {};
  // TODO: Check if it is in the db...
  //

  db1.one("SELECT event_id, E.event_name, A.association_name, A.association_id, start_date, end_date, start_time, end_time, room, image_path, description, registration_link \
            FROM events as E, associations as A, images as I, location as L \
            WHERE E.association_id = A.association_id and E.image_id = I.image_id and E.location_id = L.location_id and event_id=${idused}", {idused: id})
      .then(function (data) {
        //console.log(data);
        responseDB.eventInfo = {};
        responseDB.eventInfo = data;

        db1.any("SELECT first_name, last_name, user_id, image_path \
            FROM interested natural join students natural join images \
            WHERE event_id=${idused}", {idused: id})
            .then(function (data) {
              responseDB.interestedResponse = data;

              db1.any("SELECT notification_id, notification_text, notification_name,date_sent \
                        FROM notifications \
                        WHERE event_id=${idused}", {idused: id})
                  .then(function (data) {
                    responseDB.updateResponse = data;
                    db1.any("SELECT review_id, first_name, last_name, image_path, review, date_created, rating, user_id \
                              FROM review natural join students natural join images \
                              WHERE event_id=${idused}", {idused: id})
                        .then(function (data) {
                          responseDB.reviewResponse = data;

                          db1.any("SELECT category_name \
                                    FROM events_categories natural join category \
                                    WHERE event_id=${idused}", {idused: id})
                              .then(function (data) {
                                responseDB.categoriesResponse = data;


                                const { event_id, event_name, association_id, association_name, start_date, end_date, start_time, end_time, room, image_path, description, registration_link } = responseDB.eventInfo;
                                var  concatenatedCategories = data.map((category) => category.category_name);

                                const response = {

                                  event_id,
                                  event_name,
                                  association_id ,
                                  association_name,
                                  start_date,
                                  end_date,
                                  start_time,
                                  end_time,
                                  room,
                                  image_path,
                                  description,
                                  registration_link,
                                  interested: responseDB.interestedResponse,
                                  updates: responseDB.updateResponse,
                                  reviews: responseDB.reviewResponse,
                                  categories: concatenatedCategories
                                  //Le Falta
                                  //interested = array = [firstName, lastName, userImage, userID]
                                  //updates = array = [id, title, text, timestamp]
                                  //review  = array = [reviewID, firstName, LastName, UserImage, comment, timestamp, rating, userId]
                                  //categories [array]

                                }


                                // Send Event Information
                                console.log('Success: Get Event Information');
                                res.json(response);







                              })
                              .catch(function (error) {
                                  // error;
                                  console.log('Individual Event: categories failed.')
                              });
                        })
                        .catch(function (error) {
                            // error;
                            console.log('Individual Event: review failed.')
                        });

                  })
                  .catch(function (error) {
                      // error;
                      console.log('Individual Event: update failed.')
                  });
            })
            .catch(function (error) {
                // error;
                console.log('Individual Event: interested failed.')
            });

      })
      .catch(function (error) {
          // error;
          console.log('Individual Event Info Failed')
      });






  // console.log(eventInfo);
  // console.log(interestedResponse);
  // console.log(updateResponse);
  // console.log(reviewResponse);
  // console.log(categoriesResponse);




  // Check if it is in the Testing db
  // const event = db.event[id];
  // if (event === undefined)
  //   return res.status(400).send('Error: Event not found in the DB.');
  // Destructure event information


  // TODO: Get extra information from the db
  //
  // Get extra information from the Testing db (other tables)
  // The list of students interested of going.



});

app.get('/api/sponsors/:id', (req, res) => {
  console.log(req.params);
  // Destructure params
  const { id } = req.params;
  // TODO: Check if it is in the db...
  //
  // Check if it is in the Testing db
  const sponsors = db.sponsors[id];
  if (sponsors === undefined)
    return res.status(400).send('Error: Sponsor not found in the DB.');
  // Destructure event information
  const { name, image } = sponsors;
  // TODO: Get extra information from the db
  //
  // Get extra information from the Testing db (other tables)
  // The list of students interested of going.

  const response = {
    name,
    id,
    image
  }
  // Send Event Information
  console.log('Success: Get Sponsor Information');
  res.json(response);
});


// GET - Event stats
// response:
//    [] genders
//        {gender: string, count: int}
//    [] ages
//        {age: int, count: int}
//    [] hometowns
//        {hometown: string, count: int}
//    [] colleges
//        {college: string, count: int}
//    [] majors
//        {major: string, count: int}
//    [] interested
//        {date: 'time stamp', count: int}
//    {} general
//        event_name: string
//        image_path: string
//
app.get('/api/event-stats/:id', (req, res) => {
  console.log(req.params);
  // Destructure params
  const { id } = req.params;
  const response = {};

  // Get Colleges
  db1.any(`
    SELECT college, count(*)
    FROM students natural join interested
    WHERE event_id = $[idused]
    GROUP BY college;`, {idused: id})
    .then(function(data) {
      // Change count type. From string to int
      data.forEach(obj => obj.count = +obj.count);

      console.log(data);
      response.colleges = data;

      // Get Majors
      db1.any(`
        SELECT major, count(*)
        FROM students natural join interested
        WHERE event_id = $[idused]
        GROUP BY major`, {idused: id})
      .then(function(data) {
        // Change count type. From string to int
        data.forEach(obj => obj.count = +obj.count);

        console.log(data);
        response.majors = data;

        // Get Genders
        db1.any(`
          SELECT gender, count(*)
          FROM students natural join interested
          WHERE event_id = $[idused]
          GROUP BY gender`, {idused: id})
        .then(function(data) {
          // Change count type. From string to int
          data.forEach(obj => obj.count = +obj.count);

          console.log(data);
          response.genders = data;

          // Get Hometowns
          db1.any(`
            SELECT hometown, count(*)
            FROM students natural join interested
            WHERE event_id = $[idused]
            GROUP BY hometown`, {idused: id})
          .then(function(data) {
            // Change count type. From string to int
            data.forEach(obj => obj.count = +obj.count);

            console.log(data);
            response.hometowns = data;

            // Get Ages
            db1.any(`
              SELECT date_part('year', age(birthdate)) as age, count(*)
              FROM students natural join interested
              WHERE event_id = $[idused]
              GROUP BY date_part('year', age(birthdate));`, {idused: id})
            .then(function(data) {
              // Change count type. From string to int
              data.forEach(obj => obj.count = +obj.count);

              console.log(data);
              response.ages = data;

              // GET interested
              db1.any(`
                SELECT stat_date as date, interested_count as count
                FROM event_stats
                WHERE event_id = $[idused]
                ORDER BY stat_date`, {idused: id})
              .then(function(data) {
                // Change count type. From string to int
                data.forEach(obj => obj.count = +obj.count);

                console.log(data);
                response.interested = data;

                db1.one(`
                  SELECT event_name, image_path
                  FROM events natural join images
                  WHERE event_id = $[idused]`, {idused: id})
                .then(function(data) {
                  console.log(data);
                  response.general = data;

                  // Send Event Information
                  console.log('Success: Get Event Stats');
                  res.json(response);
                })
                .catch(function(error) {
                  // error;
                  console.log('Event Stats: image_path and event_name failed.');
                });
              })
              .catch(function(error) {
                // error;
                console.log('Event Stats: interested failed.');
              });
            })
            .catch(function(error) {
              // error;
              console.log('Event Stats: ages failed.');
            });
          })
          .catch(function(error) {
            // error;
            console.log('Event Stats: hometowns failed.');
          });
        })
        .catch(function(error) {
          // error;
          console.log('Event Stats: genders failed.');
        });
      })
      .catch(function(error) {
        // error;
        console.log('Event Stats: majors failed.');
      });
    })
    .catch(function (error) {
      // error;
      console.log('Event Stats: colleges failed.');
    });

});


app.get('/api/home', (req, res) => {
  console.log(req.params);
  const id = '1';
  const responseDB = {};
  db1.any('SELECT event_id, event_name, association_name, time_stamp, image_path \
            FROM associations as A, (events as E natural join images), followed_associations as FA, students as S \
            WHERE E.association_id = A.association_id and FA.association_id = E.association_id and FA.user_id = S.user_id and S.user_id = ${idused} \
            ORDER BY time_stamp DESC', {idused: id})
      .then(function (data) {
        responseDB.eventsCreated = data;

        db1.any("SELECT E.event_id, E.event_name, E.association_id, notification_name, notification_text, date_sent, image_path \
                  FROM notifications as N, events as E, (associations as A natural join images), followed_associations as FA \
                  WHERE N.event_id = E.event_id and A.association_id = E.association_id and A.association_id = FA.association_id and user_id = ${idused} \
                  ORDER BY date_sent DESC", {idused: id})
            .then(function (data) {
            responseDB.updates = data;
            console.log(data);
            const response =[];
            //breakdown for events
            for (let i = 0; i<responseDB.eventsCreated.length;i++) {

                // Destructure DB information
                const { event_id, event_name, association_name, time_stamp, image_path } = responseDB.eventsCreated[i];
                const summary = association_name + " has created a new event: ";
                const extraText = event_name;
                const singleEvent = {

                  image: image_path,
                  summary,
                  date: time_stamp,
                  extraText
                }

                response.push(singleEvent);
            }

            for (let i = 0; i<responseDB.updates.length;i++) {

                // Destructure DB information
                const { event_id, event_name, association_id, notification_name, notification_text,date_sent, image_path } = responseDB.updates[i];
                const summary = event_name + " has a new update: ";
                const extraText = notification_text;
                const singleUpdate = {

                  image: image_path,
                  summary,
                  date: date_sent,
                  extraText
                }

                response.push(singleUpdate);
            }

            res.json(response);

            })
            .catch(function (error) {
              // error;
              console.log('Updates Info Failed')
            });



      })
      .catch(function (error) {
        // error;
        console.log('Events Created Info Failed')
      });

});

app.get('/api/home/events', (req, res) => {
  console.log(req.params);
  const id = '1'
  db1.any("SELECT event_id, event_name,events.association_id, association_name, start_date, end_date, start_time, end_time, room, image_path \
            FROM interested natural join events natural join images natural join location, associations \
            WHERE user_id = ${idused} and events.association_id = associations.association_id", {idused: id})

      .then(function (data) {
        res.json(data);
      })
      .catch(function (error) {
        // error;
        console.log('Events Info Home Failed')
      });
});

app.get('/api/home/associations', (req, res) => {
  console.log(req.params);
  const id = '1'
  db1.any("SELECT association_id, association_name, initials, image_path \
            FROM followed_associations natural join associations natural join images \
            WHERE user_id = ${idused}", {idused: id})

      .then(function (data) {
        res.json(data);
      })
      .catch(function (error) {
        // error;
        console.log('Events Info Home Failed')
      });
});

app.get('/api/home-associations/reviews', (req, res) => {
  console.log(req.params);
  const id = '1';
  const response=[];
  db1.any("SELECT review_id, first_name, last_name, image_path, review, date_created, event_name, rating \
            FROM review natural join students natural join images, events \
            WHERE association_id= ${idused} and events.event_id = review.event_id", {idused: id})

      .then(function (data) {
        console.log("TTTTTTT")
        //console.log(data);
        for (let i = 0; i<data.length;i++) {

            // Destructure DB information
            const { review_id, first_name, last_name, image_path, review,date_created, event_name, rating } = data[i];
            const summary = first_name + " "+ last_name + " has reviewed your event: " + event_name;
            const extraText = review;
            const singleReview = {

              image: image_path,
              summary,
              date: date_created,
              extraText
            }
            console.log(singleReview);
            response.push(singleReview);
        }
        //console.log(response);
        res.json(response);
      })
      .catch(function (error) {
        // error;
        console.log('Events Info Home-Association Failed')
      });
});

app.get('/api/home-associations/events', (req, res) => {
  console.log(req.params);
  const id = '1';

  db1.any("SELECT event_id, E.event_name, A.association_name, A.association_id, start_date, end_date, start_time, end_time, room, image_path, description, registration_link \
            FROM events as E, associations as A, images as I, location as L \
            WHERE E.association_id = A.association_id and E.image_id = I.image_id and E.location_id = L.location_id and A.association_id= ${idused}", {idused: id})

      .then(function (data) {

        console.log(data);
        res.json(data);
      })
      .catch(function (error) {
        // error;
        console.log('All Events Home-Association Failed')
      });
});

app.get('/api/search/event/orderby/asc', (req, res) => {
  db1.any("SELECT event_id, E.event_name, A.association_name, A.association_id, start_date, end_date, start_time, end_time, room, image_path, description, registration_link \
           FROM events as E, associations as A, images as I, location as L \
           WHERE E.association_id = A.association_id and E.image_id = I.image_id and E.location_id = L.location_id \
           ORDER BY event_name asc")

           .then(function(data){
             // success;
             console.log(data);
               // Send Event Information
               console.log('Success: Get Event Information');
               res.json({events: data});
             //console.log(data[0])
             console.log('worked')


           })

         .catch(function (error) {
           // error;
           console.log('Updates Info Failed')
         });


  console.log(req.params);
  console.log("REACHED");

});

app.get('/api/search/event/orderby/desc', (req, res) => {
  db1.any("SELECT event_id, E.event_name, A.association_name, A.association_id, start_date, end_date, start_time, end_time, room, image_path, description, registration_link \
           FROM events as E, associations as A, images as I, location as L \
           WHERE E.association_id = A.association_id and E.image_id = I.image_id and E.location_id = L.location_id \
           ORDER BY event_name desc")

           .then(function(data){
             // success;
             console.log(data);
               // Send Event Information
               console.log('Success: Get Event Information');
               res.json({events: data});
             //console.log(data[0])
             console.log('worked')
           })

         .catch(function (error) {
           // error;
           console.log('Updates Info Failed')
         });

  console.log(req.params);
  console.log("REACHED");

});

app.get('/api/search/association/orderby/asc', (req, res) => {
  db1.any("SELECT association_id, association_name, initials, room, page_link, email, image_path, bio \
          FROM associations natural join account natural join images natural join location \
          ORDER BY association_name asc")
      .then(function (data) {
          // success;

          // Send All Associations Information
          console.log('Success: Get All Associations Information');
          res.json({associations: data})
          //console.log(data[0])
          console.log('worked')
      })
      .catch(function (error) {
          // error;
          console.log('no function')
      });

});

app.get('/api/search/association/orderby/desc', (req, res) => {
  db1.any("SELECT association_id, association_name, initials, room, page_link, email, image_path, bio \
          FROM associations natural join account natural join images natural join location \
          ORDER BY association_name desc")
      .then(function (data) {
          // success;
          // Send All Associations Information
          console.log('Success: Get All Associations Information');
          res.json({associations: data})
          //console.log(data[0])
          console.log('worked')
      })
      .catch(function (error) {
          // error;
          console.log('no function')
      });

});

// Search for events
//  Querystring params:
//    name: string
//    order: enum
//    category: enum
app.get('/api/search/event', (req, res) => {
  // check for query params
  console.log('name', req.query.name);
  console.log('order', req.query.order);
  console.log('category', req.query.category);

  // db1.any(`
  //   `)
  //   .then()
  //   .catch();

  res.json({ok: 'ok'});
})

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
