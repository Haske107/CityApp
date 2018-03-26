import { Component, OnInit } from '@angular/core';
import {City} from "../models/city.model";
import {UploadService} from "../upload.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  NewCities: City[] = [];
  Cities: City[] = [];
  DoneCities: City[] = [];

  constructor(private upload: UploadService, private router: Router) { }

  ngOnInit() {
    this.getCities();
  }

  getCities() {
    this.upload.getCities().subscribe(
      data => {
        this.NewCities = data.obj;
      this.NewCities.forEach( _City =>  {
        if (_City.completed) {
          this.DoneCities.push(_City);
        } else {
          this.Cities.push(_City);
        }
      });
      }
    );
  }

  selectCity(name: string) {
    this.upload.getCity(name).subscribe(_City => {
      this.upload.selectedCity = _City.obj;
      console.log(this.upload.selectedCity);
      this.router.navigateByUrl('/info');
    });

  }

  newCity() {
    this.upload.selectedCity = new City();
    console.log(this.upload.selectedCity);
    this.router.navigateByUrl('/info');
  }

}
