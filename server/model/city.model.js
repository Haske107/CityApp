var mongoose = require('mongoose');
var schema = mongoose.Schema;


var CitySchema = new schema({
  name: {type: String},
  editor: {type: schema.Types.ObjectId, ref: 'User'},
  population: {type: Number},
county: {type: String},
needpermit: {type: String},
howpermit: {type: String},
insurance: {type: String},
law: {type: String},
firerules: {type: String},
filminghours: {type: String},
notification: {type: String},
studentdiscount: {type: String},
permit: {type: String},
coi: {type: String},
conduct: {type: String},
notificationform: {type: String},
parking: {type: String},
completed: {type: Boolean},
boundarycoordinates: {type: String},
permitoffice: {
  address: {type: String}, //
    phone: {type: String}, //
    hours: {
    monday: { open: {type: String}, close: {type: String} }, //
    tuesday: { open: {type: String}, close: {type: String} }, //
    wednesday: { open: {type: String}, close: {type: String} }, //
    thursday: { open: {type: String}, close: {type: String} }, //
    friday: { open: {type: String}, close: {type: String} }, //
    saturday: { open: {type: String}, close: {type: String} }, //
    sunday: { open: {type: String}, close: {type: String} }, //
  },
  holidays: [{
    name: {type: String},
    start: {type: String}, //
    end: {type: String} //
  }],
    processingperiod: {type: Number}, //
    filmcontact: {
    fname: {type: String}, //
      lname: {type: String}, //
      phone: {type: String}, //
      email: {type: String} //
  },
  studentcontact: {
    fname: {type: String}, //
      lname: {type: String}, //
      phone: {type: String}, //
      email: {type: String} //
  }
},
hospitals: [{
  name: {type: String}, //
  address: {type: String},  //
  coordinates: { lat: {type: String}, lng: {type: String} }  //
}],
police: [{
  name: {type: String}, //
  address: {type: String}, //
  coordinates: { lat: {type: String}, lng: {type: String} } //
}],
fire: [{
  name: {type: String}, //
  address: {type: String}, //
  coordinates: { lat: {type: String}, lng: {type: String} } //
}]
});

module.exports = mongoose.model('City', CitySchema);
