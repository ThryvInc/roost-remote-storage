var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var LocalAPIKeyStrategy = require('passport-localapikey').Strategy;
var User = require('../models/user');

passport.use(new BasicStrategy(
  function(username, password, callback) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return callback(err); }

      // No user found with that username
      if (!user) { return callback(null, false); }

      // Make sure the password is correct
      user.verifyPassword(password, function(err, isMatch) {
        if (err) { return callback(err); }

        // Password did not match
        if (!isMatch) { return callback(null, false); }

        // Success
        return callback(null, user);
      });
    });
  }
));

passport.use(new LocalAPIKeyStrategy(
  function(key, callback) {
    User.findOne({ apiKey: key }, function (err, user) {
      if (err) { return callback(err); }
      if (!user) { return callback(null, false); }
      return callback(null, user);
    });
  }
));

exports.login = passport.authenticate('basic', { session: false} );
exports.isAuthenticated = passport.authenticate('localapikey', { session : false });