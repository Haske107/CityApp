import { Component, OnInit } from '@angular/core';
import {City} from '../models/city.model';
import {AmazingTimePickerService} from 'amazing-time-picker';
import {UploadService} from '../upload.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {

  city: City;

  // PERMIT ARRAYS
  UploadedPermits = [];
  SelectedPermits = [];

  UploadedCOC = [];
  SelectedCOC = [];

  UploadedCOI = [];
  SelectedCOI = [];

  UploadedParking = [];
  SelectedParking = [];

  UploadedNotify = [];
  SelectedNotify = [];


  CoordinateBuffer: string;
  Coordinates: {};

  constructor(private atp: AmazingTimePickerService, private upload: UploadService, private router: Router, private snackbar: MatSnackBar) {
    this.city = new City();
  }
  ngOnInit()  {
    this.city = this.upload.selectedCity;
    if (isNullOrUndefined(this.city)) {
      this.toHome();
    }
    // POPULATE UPLOADED PERMITS
    this.getUploadedPermits();
    this.getUploadedCOC();
    this.getUploadedCOI();
    this.getUploadedNotify();
    this.getUploadedParking();
    ///////
  }


// DOCUMENT FUNCTIONS
uploadPermit()  {
    const Data = new FormData();
    this.SelectedPermits.forEach( Doc =>  {
      Data.append('Document', Doc);
    });
  this.upload.uploadDocument(this.city.name, 'Permit', Data).subscribe(
    data => {
      console.log(data);
      this.snackbar.open('Successfully uploaded ' + 'Permit' + ' for ' + this.city.name, null, {
        duration: 1300
      });
      this.SelectedPermits = [];
      this.getUploadedPermits();
    },
    error =>  {
      this.snackbar.open('Error Uploading Document For ' + this.city.name, null, {
        duration: 1300
      });
    }
  );
}
selectPermit(event: any)  {
    for (let i = 0; i < event.target.files.length; i++) {
      this.SelectedPermits.push(event.target.files[i]);

    }
}
getUploadedPermits()  {
  this.upload.getUploads(this.city.name, 'Permit').subscribe(
    data => {
      this.UploadedPermits = [];
      for (let i = 0; i < data.names.length; i++) {
        this.UploadedPermits.push(data.names[i]);
      }
    }
  );
}
removeUploadedPermit(i: number) {
  this.upload.removeUpload(this.city.name, this.UploadedPermits[i], 'Permit').subscribe(
    data => {
      this.snackbar.open("DELETED",null,{
        duration: 1300
      });
      this.getUploadedPermits();
    }
  );
}
removeSelectedPermit(i: number) {
    this.SelectedPermits.splice(i, 1);

}
//////////////////////////////////////
  uploadCOI()  {
    const Data = new FormData();
    this.SelectedCOI.forEach( Doc =>  {
      Data.append('Document', Doc);
    });
    this.upload.uploadDocument(this.city.name, 'COI', Data).subscribe(
      data => {
        console.log(data);
        this.snackbar.open('Successfully uploaded ' + 'COI' + ' for ' + this.city.name, null, {
          duration: 1300
        });
        this.SelectedCOI = [];
        this.getUploadedCOI();
      },
      error =>  {
        this.snackbar.open('Error Uploading Document For ' + this.city.name, null, {
          duration: 1300
        });
      }
    );
  }
  selectCOI(event: any)  {
    for (let i = 0; i < event.target.files.length; i++) {
      this.SelectedCOI.push(event.target.files[i]);
    }
  }
  getUploadedCOI()  {
    this.upload.getUploads(this.city.name, 'COI').subscribe(
      data => {
        this.UploadedCOI = [];
        for (let i = 0; i < data.names.length; i++) {
          this.UploadedCOI.push(data.names[i]);
        }
      }
    );
  }
  removeUploadedCOI(i: number) {
    this.upload.removeUpload(this.city.name, this.UploadedCOI[i], 'COI').subscribe(
      data => {
        this.snackbar.open("DELETED",null,{
          duration: 1300
        });
        this.getUploadedCOI();
      }
    );
  }
  removeSelectedCOI(i: number) {
    this.SelectedCOI.splice(i, 1);
  }
//////////////////////////////////////
  uploadCOC()  {
    const Data = new FormData();
    this.SelectedCOC.forEach( Doc =>  {
      Data.append('Document', Doc);
    });
    this.upload.uploadDocument(this.city.name, 'COC', Data).subscribe(
      data => {
        console.log(data);
        this.snackbar.open('Successfully uploaded ' + 'COC' + ' for ' + this.city.name, null, {
          duration: 1300
        });
        this.SelectedCOC = [];
        this.getUploadedCOC();
      },
      error =>  {
        this.snackbar.open('Error Uploading Document For ' + this.city.name, null, {
          duration: 1300
        });
      }
    );
  }
  selectCOC(event: any)  {
    for (let i = 0; i < event.target.files.length; i++) {
      this.SelectedCOC.push(event.target.files[i]);
    }
  }
  getUploadedCOC()  {
    this.upload.getUploads(this.city.name, 'COC').subscribe(
      data => {
        this.UploadedCOC = [];
        for (let i = 0; i < data.names.length; i++) {
          this.UploadedCOC.push(data.names[i]);
        }
      }
    );
  }
  removeUploadedCOC(i: number) {
    this.upload.removeUpload(this.city.name, this.UploadedCOC[i], 'COC').subscribe(
      data => {
        this.snackbar.open("DELETED",null,{
          duration: 1300
        });
        this.getUploadedCOC();
      }
    );
  }
  removeSelectedCOC(i: number) {
    this.SelectedCOC.splice(i, 1);
  }
//////////////////////////////////////
  uploadNotify()  {
    const Data = new FormData();
    this.SelectedNotify.forEach( Doc =>  {
      Data.append('Document', Doc);
    });
    this.upload.uploadDocument(this.city.name, 'Notify', Data).subscribe(
      data => {
        console.log(data);
        this.snackbar.open('Successfully uploaded ' + 'Notify' + ' for ' + this.city.name, null, {
          duration: 1300
        });
        this.SelectedNotify = [];
        this.getUploadedNotify();
      },
      error =>  {
        this.snackbar.open('Error Uploading Document For ' + this.city.name, null, {
          duration: 1300
        });
      }
    );
  }
  selectNotify(event: any)  {
    for (let i = 0; i < event.target.files.length; i++) {
      this.SelectedNotify.push(event.target.files[i]);
    }
  }
  getUploadedNotify()  {
    this.upload.getUploads(this.city.name, 'Notify').subscribe(
      data => {
        this.UploadedNotify = [];
        for (let i = 0; i < data.names.length; i++) {
          this.UploadedNotify.push(data.names[i]);
        }
      }
    );
  }
  removeUploadedNotify(i: number) {
    this.upload.removeUpload(this.city.name, this.UploadedNotify[i], 'Notify').subscribe(
      data => {
        this.snackbar.open("DELETED",null,{
          duration: 1300
        });
        this.getUploadedNotify();
      }
    );
  }
  removeSelectedNotify(i: number) {
    this.SelectedNotify.splice(i, 1);
  }
  ////////////////////////////////
  uploadParking()  {
    const Data = new FormData();
    this.SelectedParking.forEach( Doc =>  {
      Data.append('Document', Doc);
    });
    this.upload.uploadDocument(this.city.name, 'Parking', Data).subscribe(
      data => {
        console.log(data);
        this.snackbar.open('Successfully uploaded ' + 'Parking' + ' for ' + this.city.name, null, {
          duration: 1300
        });
        this.SelectedParking = [];
        this.getUploadedParking();
      },
      error =>  {
        this.snackbar.open('Error Uploading Document For ' + this.city.name, null, {
          duration: 1300
        });
      }
    );
  }
  selectParking(event: any)  {
    for (let i = 0; i < event.target.files.length; i++) {
      this.SelectedParking.push(event.target.files[i]);
    }
  }
  getUploadedParking()  {
    this.upload.getUploads(this.city.name, 'Parking').subscribe(
      data => {
        this.UploadedParking = [];
        for (let i = 0; i < data.names.length; i++) {
          this.UploadedParking.push(data.names[i]);
        }
      }
    );
  }
  removeUploadedParking(i: number) {
    this.upload.removeUpload(this.city.name, this.UploadedParking[i], 'Parking').subscribe(
      data => {
        this.snackbar.open("DELETED",null,{
          duration: 1300
        });
        this.getUploadedParking();
      }
    );
  }
  removeSelectedParking(i: number) {
    this.SelectedParking.splice(i, 1);
  }






Save()  {
    this.stringToCoords();
    this.upload.saveCity(this.city)
      .subscribe(
        res => {
          console.log(res);
          this.snackbar.open('Succesfully Saved ' + this.city.name, null, {
            duration: 1300
          });
        },
        error =>  {
          this.snackbar.open('Succesfully Saving' + this.city.name, null, {
            duration: 1300
          });
        });
  }


  toHome() {
    this.router.navigateByUrl('/home');
  }


  addHoliday()  {
    this.city.permitoffice.holidays.push({name: '', start: '', end: ''});
  }

  removeHoliday()  {
    this.city.permitoffice.holidays.pop();
  }

  addHospital()  {
    this.city.hospitals.push({name: '', address: '', coordinates: {lat: '', lng: ''}});
  }

  removeHospital()  {
    this.city.hospitals.pop();
  }
  addFire()  {
    this.city.fire.push({name: '',    phone: '', address: '', coordinates: {lat: '', lng: ''}});
  }

  removeFire()  {
    this.city.fire.pop();
  }
  addPolice()  {
    this.city.police.push({name: '', phone: '',
      address: '', coordinates: {lat: '', lng: ''}});
  }

  removePolice()  {
    this.city.police.pop();
  }


  completed()  {
    this.upload.completed(this.city.name).subscribe(res => {
      console.log(res);
    });
  }
  stringToCoords() {
    this.city.boundarycoordinates = this.CoordinateBuffer;
  }
  open(code: string) {
    const amazingTimePicker = this.atp.open();
    amazingTimePicker.afterClose().subscribe(time => {
      if (code === 'su-o') {
        this.city.permitoffice.hours.sunday.open = time;
      } else if (code === 'su-c') {
        this.city.permitoffice.hours.sunday.close = time;
      } else if (code === 'mo-o') {
        this.city.permitoffice.hours.monday.open = time;
      } else if (code === 'mo-c') {
        this.city.permitoffice.hours.monday.close = time;
      } else if (code === 'tu-o') {
        this.city.permitoffice.hours.tuesday.open = time;
      } else if (code === 'tu-c') {
        this.city.permitoffice.hours.tuesday.close = time;
      } else if (code === 'we-o') {
        this.city.permitoffice.hours.wednesday.open = time;
      } else if (code === 'we-c') {
        this.city.permitoffice.hours.wednesday.close = time;
      } else if (code === 'th-o') {
        this.city.permitoffice.hours.thursday.open = time;
      } else if (code === 'th-c') {
        this.city.permitoffice.hours.thursday.close = time;
      } else if (code === 'fr-o') {
        this.city.permitoffice.hours.friday.open = time;
      } else if (code === 'fr-c') {
        this.city.permitoffice.hours.friday.close = time;
      } else if (code === 'sa-o') {
        this.city.permitoffice.hours.saturday.open = time;
      } else if (code === 'sa-c') {
        this.city.permitoffice.hours.saturday.close = time;
      }
    });
  }
}
