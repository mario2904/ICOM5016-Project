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
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uuid = require('node-uuid');
const validate = require('./utils/validate');
const filter = require('./utils/filter');

// API routes
const api = require('./api');

// File Uploaders
const imgUpload = multer({ dest: './public/images/tmp', fileFilter: filter.image}).single('image');

// Create Testing db
const db = {};

const db1 = require('./db');

// Add Middleware Express ------------------------------------------------------

// Allow Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json())

// Setup path to static files
app.use(express.static(__dirname + '/public'));

// Handle REST API calls ------------------------------------------------------

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

          for (let i = 0; i < data.length; i++) {

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
          for (let i = 0; i < data.length; i++) {

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


// GET - Search for events
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
});

app.use('/api', api);

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
