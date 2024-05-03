import {Routes} from '@angular/router';
import {LoginComponent} from "./component/authentication/login/login.component";
import {HomeComponent} from "./component/home/home.component";
import {PartnerSelectionComponent} from "./component/authentication/partner-selection/partner-selection.component";
import {RegisterComponent} from "./component/authentication/register/register.component";
import {VerifyEmailComponent} from "./component/authentication/verify-email/verify-email.component";
import {PasswordRecoveryComponent} from "./component/authentication/password-recovery/password-recovery.component";
import {PasswordResetComponent} from "./component/authentication/password-reset/password-reset.component";
import {StorageKeys} from "./component/misc/storage-keys";
import {UserAccountComponent} from "./component/user-account/user-account.component";
import {ConnectionSecurityComponent} from "./component/connection-security/connection-security.component";
import {ManageProductsComponent} from "./component/manage-products/manage-products.component";
import {OrderHistoryComponent} from "./component/order-history/order-history.component";
import {ManageMenusComponent} from "./component/manage-menus/manage-menus.component";


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
  {path: 'connection-security', component: ConnectionSecurityComponent},
  {path: 'manage-products', component: ManageProductsComponent},
  {path: 'manage-menus', component: ManageMenusComponent},
  {path: 'order-history', component: OrderHistoryComponent},
];
