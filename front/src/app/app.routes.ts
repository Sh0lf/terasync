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
import {PaymentMethodsComponent} from "./component/user-account/payment-methods/payment-methods.component";
import {ManageProductsComponent} from "./component/user-account/manage-products/manage-products.component";
import {ManageUsersComponent} from "./component/user-account/manage-users/manage-users.component";
import {ConnectionSecurityComponent} from "./component/user-account/connection-security/connection-security.component";
import {OrderHistoryComponent} from "./component/user-account/order-history/order-history.component";
import {MessageCenterComponent} from "./component/user-account/message-center/message-center.component";
import {
  OrderHistoryDetailedComponent
} from "./component/user-account/order-history/order-history-detailed/order-history-detailed.component";
import {BusinessPageComponent} from "./component/business-page/business-page.component";
import {CheckoutComponent} from "./component/checkout/checkout.component";
import {
  ChooseDeliveryServicesComponent
} from "./component/user-account/choose-delivery-services/choose-delivery-services.component";
import {ManageOrdersComponent} from "./component/user-account/manage-orders/manage-orders.component";
import {CheckoutErrorComponent} from "./component/checkout/checkout-error/checkout-error.component";


export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: `register/:${StorageKeys.USER_CATEGORY}`, component: RegisterComponent},
  {path: 'verify-email', component: VerifyEmailComponent},
  {path: 'partner-selection', component: PartnerSelectionComponent},
  {path: 'password-recovery', component: PasswordRecoveryComponent},
  {path: `password-reset/:${StorageKeys.USER_TOKEN}`, component: PasswordResetComponent},
  {path: 'business-page', component: BusinessPageComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'checkout-error', component: CheckoutErrorComponent},
  {path: 'order-history-detailed', component: OrderHistoryDetailedComponent},
  {
    path: 'user-account', component: UserAccountComponent, children: [
      {path: 'manage-products', component: ManageProductsComponent},
      {path: 'message-center', component: MessageCenterComponent},
      {path: `manage-users/:${StorageKeys.USER_CATEGORY}`, component: ManageUsersComponent},
      {path: 'choose-delivery-services', component: ChooseDeliveryServicesComponent},
      {path: 'connection-security', component: ConnectionSecurityComponent},
      {path: 'user-settings', component: UserSettingsComponent},
      {path: 'order-history', component: OrderHistoryComponent},
      {path: 'manage-orders', component: ManageOrdersComponent},
      {path: 'order-history-detailed/:id', component: OrderHistoryDetailedComponent},
      {path: 'payment-methods', component: PaymentMethodsComponent},
    ],
  },
];
