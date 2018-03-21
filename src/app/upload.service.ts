import {Http, Response, Headers} from '@angular/http';
import {Injectable} from '@angular/core';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {City} from './models/city.model';

@Injectable()
export class UploadService {

  constructor(private http: Http) {}

  selectedCity: City;

  saveCity(city: City) {
    const body = JSON.stringify(city);
    const headers = new Headers({
      'Content-Type': 'application/json'});
    return this.http.post('https://loca-city-app.herokuapp.com/save' , body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }

  getCity(name: string) {
    const body = name;
    const headers = new Headers({
      'Content-Type': 'application/json'});
    return this.http.get('https://loca-city-app.herokuapp.com/getOne/' + body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }

  getCities() {
    const headers = new Headers({
      'Content-Type': 'application/json'});
    return this.http.get('https://loca-city-app.herokuapp.com/getAll' )
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }

  uploadDocument(CityName: string, DocType: string, Document: FormData) {
    const headers = new Headers({
      'Content': 'FormData'
    });
    return this.http.post('https://loca-city-app.herokuapp.com/upload/' + CityName + '/' + DocType, Document, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }

  uploadStatus(CityName: string)  {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.get('https://loca-city-app.herokuapp.com/uploadStatus/' + CityName, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }

  completed(CityName: string)  {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.get('https://loca-city-app.herokuapp.com/completed/' + CityName, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }
}
