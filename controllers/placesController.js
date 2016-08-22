var Place = require('../models/place');

// Create endpoint /api/places for POSTS
exports.postPlaces = function(req, res) {
  // Create a new instance of the Place model
  var place = new Place();

  console.log(req)

  // Set the place properties that came from the POST data
  place.name = req.body.name;
  place.ssids = req.body.ssids;
  place.devices = req.body.devices;
  place.imageUrl = req.body.imageUrl;
  place.userId = req.user._id

  // Save the place and check for errors
  place.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Place added!', data: place });
  });
};

// Create endpoint /api/places for GET
exports.getPlaces = function(req, res) {
  // Use the Place model to find all place
  Place.find({ userId: req.user._id }, function(err, places) {
    if (err)
      res.send(err);

    res.json(places);
  });
};

// Create endpoint /api/places/:place_id for GET
exports.getPlace = function(req, res) {
  // Use the Place model to find a specific place
  Place.findById(req.params.place_id, function(err, place) {
    if (err)
      res.send(err);

    res.json(place);
  });
};

// Create endpoint /api/places/:place_id for PUT
exports.putPlace = function(req, res) {
  // Use the Place model to find a specific place
  Place.findById(req.params.place_id, function(err, place) {
    if (err)
      res.send(err);

    if (req.body.name) place.name = req.body.name;
    if (req.body.devices) place.devices = req.body.devices;
    if (req.body.ssids) place.ssids = req.body.ssids;
    if (req.body.imageUrl) place.imageUrl = req.body.imageUrl;

    // Save the place and check for errors
    place.save(function(err) {
      if (err)
        res.send(err);

      res.json(place);
    });
  });
};

exports.deletePlace = function(req, res) {
  // Use the Place model to find a specific place and remove it
  Place.findByIdAndRemove(req.params.place_id, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Place deleted!' });
  });
};