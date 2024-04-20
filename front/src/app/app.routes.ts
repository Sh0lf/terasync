import {Routes} from '@angular/router';
import {LoginComponent} from "./component/Authentication/login/login.component";
import {HomeComponent} from "./component/home/home.component";
import {UserSelectionComponent} from "./component/Authentication/user-selection/user-selection.component";
import {RegisterComponent} from "./component/Authentication/register/register.component";
import {RegisterSuccessComponent} from "./component/Authentication/register-success/register-success.component";

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'register-success', component: RegisterSuccessComponent},
  {path: 'partner-selection', component: UserSelectionComponent},
];
