import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {AmazingTimePickerModule} from 'amazing-time-picker';
import {OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';
import { HomeComponent } from './home/home.component';
import { InfoComponent } from './info/info.component';
import {MainRoutesModule} from "./app.routing";
import {UploadService} from "./upload.service";
import {MatButtonModule, MatCardModule, MatIconModule, MatSnackBarModule} from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InfoComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatCardModule,
    BrowserAnimationsModule,
    AmazingTimePickerModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    MainRoutesModule,
    MatIconModule,
    MatSnackBarModule
  ],
  providers: [UploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
