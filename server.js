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
const cloudinary = require('cloudinary');
const stream = require('stream');

// API routes
const api = require('./api');

// File Uploaders
// const imgUpload = multer({ dest: './public/images/tmp', fileFilter: filter.image}).single('image');
const imgUpload = multer({ storage: multer.memoryStorage(), fileFilter: filter.image}).single('image');

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
app.post('/api/upload-image', imgUpload, (req, res, next) => {
  console.log(req.file);

  // Everything went fine
  // Get path to uploaded file (drop the 'public/')
  if(!req.file) {return next(new Error('no file'))}
  console.log('meh');
  const bufferStream = new stream.PassThrough();
  bufferStream.end(req.file.buffer);
  bufferStream.pipe(cloudinary.uploader.upload_stream((result) => {
    console.log('upload: ',result); }
  ));
  // const response = {image: file_reader};
  // const path = req.file.path.slice(req.file.path.indexOf('/'));
  // const response = {image: path};
  // Send path to uploaded file
  // console.log(file_reader);
  console.log('Success: Image Upload');
  console.log('Image Path:', req.file.path);
  res.json({ok: 'ok'});

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
