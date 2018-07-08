var mongoose = require('mongoose');

// Define our schema
var DeviceTypeSchema = new mongoose.Schema({
  name: String,
  hostNamespace: String,
  endpoints: Array
});

// Export the Mongoose model
module.exports = mongoose.model('DeviceType', DeviceTypeSchema);
