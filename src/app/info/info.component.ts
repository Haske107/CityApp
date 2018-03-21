import { Component, OnInit } from '@angular/core';
import {City} from '../models/city.model';
import {AmazingTimePickerService} from 'amazing-time-picker';
import {UploadService} from '../upload.service';
import {Router} from '@angular/router';
import * as _ from 'underscore';
import {MatSnackBar} from "@angular/material";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {

  city: City;

  Permit: any;
  COC: any;
  COI: any;
  Parking: any;
  Notify: any;

  Status = {
    Notify: false,
    Permit: false,
    Parking: false,
    COI: false,
    COC: false
  };

  CoordinateBuffer: string;

  Coordinates: {};

  constructor(
    private atp: AmazingTimePickerService,
    private upload: UploadService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {
    this.city = new City();
  }

  ngOnInit()  {
    this.city = this.upload.selectedCity;
    if (isNullOrUndefined(this.city)) {
      this.toHome();
    }
    this.uploadStatus();
  }
  toHome() {
    this.router.navigateByUrl('/home');
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

selectPermit(event: any)  {
    this.Permit = event.target.files[0];
}
selectNotify(event: any) {
    this.Notify = event.target.files[0];
}
selectCOI(event: any) {
    this.COI = event.target.files[0];
}
selectCOC(event: any) {
    this.COC = event.target.files[0];
}
selectParking(event: any) {
    this.Parking = event.target.files[0];
}

uploadDocument(DocType: string)  {
    const Data = new FormData();
    if (DocType === 'Parking') {
      Data.append('Document', this.Parking);
    }
    if (DocType === 'COC') {
      Data.append('Document', this.COC);
    }if (DocType === 'COI') {
      Data.append('Document', this.COI);
    }if (DocType === 'Notify') {
      Data.append('Document', this.Notify);
    }if (DocType === 'Permit') {
      Data.append('Document', this.Permit);
  }

    this.upload.uploadDocument(this.city.name, DocType, Data).subscribe(
      data => {
        console.log(data);
        this.uploadStatus();
        this.snackbar.open('Succesfully Uploaded ' + DocType + ' for ' + this.city.name, null, {
          duration: 1300
        });
      },
      error =>  {
        this.snackbar.open('Error Uploading Document For ' + this.city.name, null, {
          duration: 1300
        });
      }
    );
}

uploadStatus()  {
    this.upload.uploadStatus(this.city.name).subscribe(
      data => {
        this.Status = data.obj;
        console.log(data);
      }
    );
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
    this.upload.completed(this.city.name).subscribe(res=> {
      console.log(res);
    });
  }
  stringToCoords() {
    this.city.boundarycoordinates = this.CoordinateBuffer;
    // for (let i = 0; i < temp.length; i++) {
    //   if (temp.substr(i, 5) === '] ] ]') {
    //     console.log(temp.substr(i, 5));
    //     this.city.boundarycoordinates = temp.slice(83, i + 5);
    //     return;
    //
    //   }
    // }
  }
}
