import { Component, OnInit } from '@angular/core';
import {City} from '../models/city.model';
import {AmazingTimePickerService} from 'amazing-time-picker';
import {UploadService} from '../upload.service';
import {Router} from '@angular/router';
import * as _ from 'underscore';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {

  city: City;

  CoordinateBuffer: string;

  Coordinates: {};


  constructor( private atp: AmazingTimePickerService, private upload: UploadService, private router: Router
  ) {
    this.city = new City();
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

  ngOnInit()  {
    this.city = this.upload.selectedCity;
  }

  Save()  {
    this.stringToCoords();
    this.upload.saveCity(this.city)
      .subscribe(res => {
        console.log(res);
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
