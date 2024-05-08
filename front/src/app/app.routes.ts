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
import {UserSettingsComponent} from "./component/user-account/user-settings/user-settings.component";
import {FaqComponent} from "./component/faq/faq.component";
import {PaymentMethodsComponent} from "./component/user-account/payment-methods/payment-methods.component";
import {ManageProductsComponent} from "./component/user-account/manage-products/manage-products.component";
import {ManageMenusComponent} from "./component/user-account/manage-menus/manage-menus.component";
import {
  ManageDeliveryPersonsComponent
} from "./component/user-account/manage-delivery-persons/manage-delivery-persons.component";
import {ConnectionSecurityComponent} from "./component/user-account/connection-security/connection-security.component";
import {OrderHistoryComponent} from "./component/user-account/order-history/order-history.component";
import {MessageCenterComponent} from "./component/user-account/message-center/message-center.component";
import {
  OrderHistoryDetailedComponent
} from "./component/user-account/order-history/order-history-detailed/order-history-detailed.component";


export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: `register/:${StorageKeys.USER_CATEGORY}`, component: RegisterComponent},
  {path: 'verify-email', component: VerifyEmailComponent},
  {path: 'partner-selection', component: PartnerSelectionComponent},
  {path: 'password-recovery', component: PasswordRecoveryComponent},
  {path: `password-reset/:${StorageKeys.USER_TOKEN}`, component: PasswordResetComponent},
  {path: 'faq', component: FaqComponent},
  {
    path: 'user-account', component: UserAccountComponent, children: [
      {path: 'manage-products', component: ManageProductsComponent},
      {path: 'manage-menus', component: ManageMenusComponent},
      {path: 'message-center', component: MessageCenterComponent},
      {path: 'manage-delivery-persons', component: ManageDeliveryPersonsComponent},
      {path: 'connection-security', component: ConnectionSecurityComponent},
      {path: 'user-settings', component: UserSettingsComponent},
      {path: 'order-history', component: OrderHistoryComponent},
      {path: 'order-history-detailed/:id', component: OrderHistoryDetailedComponent},
      {path: 'payment-methods', component: PaymentMethodsComponent},
      {path: 'faq', component: FaqComponent},
    ],
  },
];
