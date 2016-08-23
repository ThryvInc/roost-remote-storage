var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var passport = require('passport');

var authController = require('./controllers/authController');
var usersController = require('./controllers/usersController')
var placesController = require('./controllers/placesController')
var devicesController = require('./controllers/devicesController')

var app = express();
app.use(bodyParser.json());

// Connect to the database before starting the application server.
mongoose.connect(process.env.MONGODB_URI);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  app.use(passport.initialize());

  var router = express.Router();
  router.get('/', function(req, res) {
    res.json({ message: 'It is ALIIIIIVE!' });
  });

  router.route('/session')
    .post(authController.isVerified);

  router.route('/users')
    .post(usersController.postUsers);
  router.route('/users/:user_id')
    .delete(authController.isAuthenticated, usersController.deleteUser);

  router.route('/places')
    .get(authController.isAuthenticated, placesController.getPlaces)
    .post(authController.isAuthenticated, placesController.postPlaces);
  router.route('/places/:place_id')
    .get(authController.isAuthenticated, placesController.getPlace)
    .put(authController.isAuthenticated, placesController.putPlace)
    .delete(authController.isAuthenticated, placesController.deletePlace);

  router.route('/places/:place_id/devices')
    .get(authController.isAuthenticated, devicesController.getDevices)
    .post(authController.isAuthenticated, devicesController.postDevices);
  router.route('/devices/:device_id')
    .get(authController.isAuthenticated, devicesController.getDevice)
    .put(authController.isAuthenticated, devicesController.putDevice)
    .delete(authController.isAuthenticated, devicesController.deleteDevice);

  app.use('/api/v1', router);

  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now on port", port);
  });
});