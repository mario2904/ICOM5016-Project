const express = require('express');
const bodyParser = require('body-parser');
const multer  = require('multer');
const cors = require('cors');

const app = express();

// Models
const { Association, Student, Event } = require('./model');

// Utils
const uuid = require('node-uuid');
const validate = require('./utils/validate');
const filter = require('./utils/filter');

// Router
const apiRouter = require('./api');

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

// Allow Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json())

// Setup port
app.set('port', (process.env.PORT || 5000));

// Setup path to static files
app.use(express.static(__dirname + '/public'));

app.all('*', apiRouter(db));

app.listen(app.get('port'), function() {
  console.log('listening on port', app.get('port'), "...");
});
