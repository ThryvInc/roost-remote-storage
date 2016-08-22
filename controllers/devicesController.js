var Device = require('../models/device');
var Place = require('../models/place');

// Create endpoint /api/v1/places/:place_id/devices for POSTS
exports.postDevices = function(req, res) {
  // Create a new instance of the Device model
  var device = new Device();

  // Set the device properties that came from the POST data
  device.name = req.body.name;
  device.describer = req.body.describer;
  device.describerNamespace = req.body.describerNamespace;
  device.host = req.body.host;
  device.hostNamespace = req.body.hostNamespace;
  device.properties = req.body.properties;
  device.imageUrl = req.body.imageUrl;

  // Save the device and check for errors
  device.save(function(err) {
    if (err)
      res.send(err);

    Place.findById(req.params.place_id, function(err, place) {
      place.devices.push(device._id)
      place.save(function(err) {
        if (err)
          res.send(err);

        res.json({ message: 'Device added!', data: device });
      });
    });
  });
};

// Create endpoint /api/v1/places/:place_id/devices for GET
exports.getDevices = function(req, res) {
  Place.findById(req.params.place_id, function(err, place) {
    if (err)
      res.send(err);

    deviceIds = _.map(place.devices, function(deviceId){ return mongoose.Types.ObjectId(deviceId) });
    Place.find({
      '_id': { $in: deviceIds }
    }, function(err, devices){
      if (err)
        res.send(err);

      res.json(devices);
    });
  });
};

// Create endpoint /api/devices/:device_id for PUT
exports.putDevice = function(req, res) {
  // Use the Device model to find a specific device
  Device.findById(req.params.device_id, function(err, device) {
    if (err)
      res.send(err);

    device.name = req.body.name;
    device.devices = req.body.devices;
    device.imageUrl = req.body.imageUrl;

    // Save the device and check for errors
    device.save(function(err) {
      if (err)
        res.send(err);

      res.json(device);
    });
  });
};

exports.deleteDevice = function(req, res) {
  // Use the Device model to find a specific device and remove it
  Device.findByIdAndRemove(req.params.device_id, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Device deleted!' });
  });
};