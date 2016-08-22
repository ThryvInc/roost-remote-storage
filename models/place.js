var mongoose = require('mongoose');

// Define our schema
var PlaceSchema = new mongoose.Schema({
  name: String,
  ssids: Array,
  devices: Array,
  imageUrl: String,
  userId: String
});

// Export the Mongoose model
module.exports = mongoose.model('Place', PlaceSchema);