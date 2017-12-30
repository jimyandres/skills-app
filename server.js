// set up ======================================================================
var express = require('express');
var app = express();
var mongoose = require('mongoose'); // mongoose for mongodb
var morgan = require('morgan');     // log requests to the console (express4)
var bodyParser = require('body-parser'); // pull information from HTML POST (express4)
var methodOverrride = require('method-override'); // simulate DELETE and PUT (express4)
var database = require('./config/database');  // load the database configuration

// configuration ===============================================================
// connect to mongoDB database on modulus.io
mongoose.connect(database.localUrl, { useMongoClient: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("DB connected");
});

// set the static files location /public/img will be /imag for users
app.use(express.static('./public'));
// log every request to the console
app.use(morgan('dev'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({'extended' : 'true'}));
// parse application/json
app.use(bodyParser.json());
// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.use(methodOverrride());

// routes ======================================================================
require('./app/routes.js')(app);

// listen (star app with node server.js) =======================================
app.listen(8080);
console.log('App listening on port 8080');
