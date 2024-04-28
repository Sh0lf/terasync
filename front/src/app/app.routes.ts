import {Routes} from '@angular/router';
import {LoginComponent} from "./component/Authentication/login/login.component";
import {HomeComponent} from "./component/home/home.component";
import {PartnerSelectionComponent} from "./component/Authentication/partner-selection/partner-selection.component";
import {RegisterComponent} from "./component/Authentication/register/register.component";
import {VerifyEmailComponent} from "./component/Authentication/verify-email/verify-email.component";
import {PasswordRecoveryComponent} from "./component/Authentication/password-recovery/password-recovery.component";
import {PasswordResetComponent} from "./component/Authentication/password-reset/password-reset.component";
import {StorageKeys} from "./component/misc/storage-keys";
import {UserAccountComponent} from "./component/user-account/user-account.component";
import {UploadPfpComponent} from "./component/upload-pfp/upload-pfp.component";
import {ConnectionSecurityComponent} from "./component/connection-security/connection-security.component";

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'verify-email', component: VerifyEmailComponent},
  {path: 'partner-selection', component: PartnerSelectionComponent},
  {path: 'password-recovery', component: PasswordRecoveryComponent},
  {path: `password-reset/:${StorageKeys.USER_TOKEN}`, component: PasswordResetComponent},
  {path: 'user-account', component: UserAccountComponent},
  {path: 'upload-pfp', component: UploadPfpComponent},
  {path: 'connection-security', component: ConnectionSecurityComponent},
];
