var mongoose = require('mongoose');
var schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var UserSchema = new schema({
  signUpDate: {type: String},
  email: {type: String, required: true, unique: true},
  firstName:{type: String},
  lastName:{type: String},
  picture: {type: String},
  ownedlocations: [{type: schema.Types.ObjectId, ref: 'Location'}],
  lastViewedLocations: [{type: schema.Types.ObjectId, ref: 'Location'}],
  createdCollections: [{type: schema.Types.ObjectId, ref: 'Collection'}],
  subscribedCollections: [{type: schema.Types.ObjectId, ref: 'Collection'}]
});

UserSchema.plugin(mongooseUniqueValidator);


module.exports = mongoose.model('User', UserSchema);
