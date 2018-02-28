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

  Cities: City[];

  constructor(private upload: UploadService, private router: Router) { }

  ngOnInit() {
    this.getCities();
  }

  getCities() {
    this.upload.getCities().subscribe(
      data => {
        this.Cities = data.obj;
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

}
