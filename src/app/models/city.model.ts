export class City {
  _id: string;
  name: string;
  population: number; //
  county: string; //
  needpermit: string; //
  howpermit: string; //
  insurance: string; //
  law: string; //
  firerules: string; //
  filminghours: string; //
  notification: string; //
  studentdiscount: string; //
  permit: any; //
  coi: any; //
  conduct: any; //
  notificationform: any; //
  parking: any; //
  completed: boolean;
  boundarycoordinates: string; //
  center: {lat: number, lng: number};
  permitoffice: {
    address: string, //
    phone: string, //
    permitprice: number,
    hours: {
      monday: { open: string, close: string }, //
      tuesday: { open: string, close: string }, //
      wednesday: { open: string, close: string }, //
      thursday: { open: string, close: string }, //
      friday: { open: string, close: string }, //
      saturday: { open: string, close: string }, //
      sunday: { open: string, close: string }, //
    },
    holidays: [{
      name: string,
      start: string, //
      end: string //
    }],
    processingperiod: number, //
    filmcontact: {
      fname: string, //
      lname: string, //
      phone: string, //
      email: string //
    },
    studentcontact: {
      fname: string, //
      lname: string, //
      phone: string, //
      email: string //
    }
  };
  hospitals: [{
    name: string, //
    address: string,  //
    coordinates: { lat: string, lng: string }  //
  }];
  police: [{
    name: string, //
    phone: string,
    address: string, //
    coordinates: { lat: string, lng: string } //
  }];
  fire: [{
    name: string, //
    phone: string,
    address: string, //
    coordinates: { lat: string, lng: string } //
  }];


  constructor() {
    this.population = 0;
    this.county = '';
    this.boundarycoordinates = '';
    this.needpermit = '';
    this.howpermit = '';
    this.insurance = '';
    this.law = '';
    this.firerules = '';
    this.filminghours = '';
    this.notification = '';
    this.studentdiscount = '';
    this.permit = '';
    this.coi = '';
    this.conduct = '';
    this.notificationform = '';
    this.parking = '';
    this.completed = false;
    this.center = {
      lat: 0,
      lng: 0,
    };
    this.permitoffice = {
      permitprice: 0,
      address: '', //
        phone: '', //
      hours: {
      monday: { open: '', close: '' }, //
      tuesday: { open: '', close: '' }, //
      wednesday: { open: '', close: '' }, //
      thursday: { open: '', close: '' }, //
      friday: { open: '', close: '' }, //
      saturday: { open: '', close: '' }, //
      sunday: { open: '', close: '' }, //
    },
      holidays: [{
        name: '',
        start: '', //
        end: '' //
      }],
        processingperiod: 0, //
      filmcontact: {
      fname: '', //
        lname: '', //
        phone: '', //
        email: '' //
    },
      studentcontact: {
        fname: '', //
          lname: '', //
          phone: '', //
          email: '' //
      }
    };
    this.hospitals = [{name: '', address: '', coordinates: {lat: '', lng: ''}}];
    this.fire = [{name: '', phone: '', address: '', coordinates: {lat: '', lng: ''}}];
    this.police = [{name: '', address: '', phone: '', coordinates: {lat: '', lng: ''}}];
  }

}
