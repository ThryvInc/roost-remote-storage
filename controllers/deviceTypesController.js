var DeviceType = require('../models/device_type');
var mongoose = require('mongoose');

// Create endpoint /api/v1/device_types/:device_type_id for GET
exports.getDeviceType = function(req, res) {
  DeviceType.findById(req.params.device_type_id, function(err, device_type){
    if (err) {
      res.send(err);
      console.log(err);
      return;
    }

    console.log(JSON.stringify(req.params));
    console.log(JSON.stringify(device_type));
    res.json(device_type);
  });
};
