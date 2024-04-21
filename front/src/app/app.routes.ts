import {Routes} from '@angular/router';
import {LoginComponent} from "./component/Authentication/login/login.component";
import {HomeComponent} from "./component/home/home.component";
import {PartnerSelectionComponent} from "./component/Authentication/partner-selection/partner-selection.component";
import {RegisterComponent} from "./component/Authentication/register/register.component";
import {RegisterSuccessComponent} from "./component/Authentication/register-success/register-success.component";
import {PasswordRecoveryComponent} from "./component/Authentication/password-recovery/password-recovery.component";
import {PasswordResetComponent} from "./component/Authentication/password-reset/password-reset.component";

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'register-success', component: RegisterSuccessComponent},
  {path: 'partner-selection', component: PartnerSelectionComponent},
  {path: 'password-recovery', component: PasswordRecoveryComponent},
  {path: 'password-reset', component: PasswordResetComponent},
];
