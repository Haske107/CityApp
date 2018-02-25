import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  Holidays = [""];
  Hospital = [""];
  Fire = [""];
  Police = [""];


  addHoliday()  {
    this.Holidays.push("");
  }

  removeHoliday()  {
    this.Holidays.pop();
  }

  addHospital()  {
    this.Hospital.push("");
  }

  removeHospital()  {
    this.Hospital.pop();
  }
  addFire()  {
    this.Fire.push("");
  }

  removeFire()  {
    this.Fire.pop();
  }
  addPolice()  {
    this.Police.push("");
  }

  removePolice()  {
    this.Police.pop();
  }

}
