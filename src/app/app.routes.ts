import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { NewUserComponent } from './new-user/new-user.component';
import { ReservationFormComponent } from './reservation-form/reservation-form.component';

export const routes: Routes = [
  { path: '', component:HomePageComponent},
  { path:'login', component:LoginComponent},
  { path:'reservation-form', component:ReservationFormComponent},
  { path:'new-user',component:NewUserComponent}
];
