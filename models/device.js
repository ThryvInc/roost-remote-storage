var mongoose = require('mongoose');

// Define our schema
var DeviceSchema   = new mongoose.Schema({
  name: String,
  describer: String,
  describerNamespace: String,
  host: String,
  hostNamespace: String,
  properties: String,
  imageUrl: String
});

// Export the Mongoose model
module.exports = mongoose.model('Device', DeviceSchema);