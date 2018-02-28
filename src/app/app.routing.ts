/**
 * Created by Jeff on 8/21/2017.
 */
import {HomeComponent} from './home/home.component';
import {RouterModule, Routes} from '@angular/router';
import {InfoComponent} from './info/info.component';

export const MAIN_ROUTES: Routes = [

  // Home Page Routes
  {path: '', redirectTo: '/info', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'info', component: InfoComponent}
];

export const MainRoutesModule = RouterModule.forRoot(MAIN_ROUTES);
