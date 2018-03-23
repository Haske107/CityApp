var mongoose = require('mongoose');
var DocumentSchema = new  mongoose.Schema({
  filename: {type: String},
  contentType: {type: String},
  length: {type: String},
  chunkSize: {type: Number},
  uploadDate: {type: String},
  aliases: {type: String},
  metadata: {type: String},
  md5: {type: String}
});
module.exports = mongoose.model('CityDocs', DocumentSchema);

