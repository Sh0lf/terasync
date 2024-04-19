import {Routes} from '@angular/router';
import {LoginComponent} from "./component/Authentication/login/login.component";
import {HomeComponent} from "./component/home/home.component";
import {UserSelectionComponent} from "./component/Authentication/user-selection/user-selection.component";

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'partner-selection', component: UserSelectionComponent},
];
