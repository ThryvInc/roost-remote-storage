var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var LocalAPIKeyStrategy = require('passport-localapikey-update').Strategy;
var User = require('../models/user');

exports.isVerified = function(req, res) {
  User.findOne({ username: req.body.username }, function (err, user) {
    if (err)
      res.send(err);

    // No user found with that username
    if (!user) { res.send(err); }

    // Make sure the password is correct
    user.verifyPassword(req.body.password, function(err, isMatch) {
      if (err) { res.send(err); }

      // Password did not match
      if (!isMatch) { res.send(err); }

      // Success
      res.json(user);
    });
  });
};

passport.use(new LocalAPIKeyStrategy({apiKeyHeader: "x-api-key"},
  function(key, callback) {
    User.findOne({ apiKey: key }, function (err, user) {
      if (err) { return callback(err); }
      if (!user) { return callback(null, false); }
      return callback(null, user);
    });
  }
));
exports.isAuthenticated = passport.authenticate('localapikey', { session : false });