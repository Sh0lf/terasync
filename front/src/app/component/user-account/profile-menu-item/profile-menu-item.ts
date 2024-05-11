import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {
  faArrowRightFromBracket,
  faBowlFood,
  faBurger,
  faCreditCard,
  faGear,
  faLock,
  faMessage,
  faQuestion,
  faTableList,
  faUserGroup
} from "@fortawesome/free-solid-svg-icons";
import {
  adminCategory,
  businessCategory,
  customerCategory,
  deliveryPersonCategory,
  deliveryServiceCategory,
  userCategories,
  UserCategory
} from "../../../service/user/userCategories";
import {
  adminRegistrationTypeADMIN,
  businessRegistrationTypeADMIN,
  customerRegistrationTypeADMIN,
  deliveryPersonRegistrationTypeADMIN,
  deliveryServiceRegistrationTypeADMIN,
  RegistrationType
} from "../../authentication/register/registration-type";

export class ProfileMenuItem {
  icon: IconDefinition;
  name: string;
  link: string;
  editingUserCategory!: UserCategory | undefined;
  registrationType!: RegistrationType | undefined;

  class: string = "profile-menu-item";
  allowedUserCategories: UserCategory[] = []

  constructor(icon: IconDefinition, name: string, link: string, allowedUserCategories: UserCategory[], editingUserCategory?: UserCategory, registrationType?: RegistrationType) {
    this.icon = icon;
    this.name = name;
    this.link = link;
    this.allowedUserCategories = allowedUserCategories;
    this.editingUserCategory = editingUserCategory;
    this.registrationType = registrationType;
  }
}

export const settings = new ProfileMenuItem(faGear, 'Settings',
  '/user-account/user-settings', userCategories);
export const connectionAndSecurity = new ProfileMenuItem(faLock,
  'Connection / Security', '/user-account/connection-security', userCategories);
export const manageDeliveryPersons = new ProfileMenuItem(faUserGroup,
  `Manage ${deliveryPersonCategory.pluralName}`,
  `/user-account/manage-users/${deliveryPersonCategory.getFormattedPluralName()}`,
  [deliveryServiceCategory, adminCategory],
  deliveryPersonCategory,
  deliveryPersonRegistrationTypeADMIN);
export const manageCustomers = new ProfileMenuItem(faUserGroup,
  `Manage ${customerCategory.pluralName}`,
  `/user-account/manage-users/${customerCategory.getFormattedPluralName()}`,
  [adminCategory],
  customerCategory,
  customerRegistrationTypeADMIN);
export const manageDeliveryServices = new ProfileMenuItem(faUserGroup,
  `Manage ${deliveryServiceCategory.pluralName}`,
  `/user-account/manage-users/${deliveryServiceCategory.getFormattedPluralName()}`,
  [adminCategory],
  deliveryServiceCategory,
  deliveryServiceRegistrationTypeADMIN);
export const manageBusinesses = new ProfileMenuItem(faUserGroup,
  `Manage ${businessCategory.pluralName}`,
  `/user-account/manage-users/${businessCategory.getFormattedPluralName()}`,
  [adminCategory],
  businessCategory,
  businessRegistrationTypeADMIN);
export const manageAdmins = new ProfileMenuItem(faUserGroup,
  `Manage ${adminCategory.pluralName}`,
  `/user-account/manage-users/${adminCategory.getFormattedPluralName()}`,
  [adminCategory],
  adminCategory,
  adminRegistrationTypeADMIN);
export const manageProducts = new ProfileMenuItem(faBurger, 'Manage Products',
  '/user-account/manage-products', [businessCategory, adminCategory]);
export const manageMenus = new ProfileMenuItem(faBowlFood, 'Manage Menus',
  '/user-account/manage-menus', [businessCategory, adminCategory]);
export const orderHistory = new ProfileMenuItem(faTableList, 'Order History',
  '/user-account/order-history',
  [customerCategory, deliveryPersonCategory, deliveryServiceCategory, businessCategory]);
export const paymentMethods = new ProfileMenuItem(faCreditCard, 'Payment Methods',
  '/user-account/payment-methods', [customerCategory]);
export const faq = new ProfileMenuItem(faQuestion, 'FAQ',
  '/user-account/faq', userCategories);
export const messageCenter = new ProfileMenuItem(faMessage, 'Message Center',
  '/user-account/message-center', [adminCategory, customerCategory, deliveryPersonCategory]);
export const logout = new ProfileMenuItem(faArrowRightFromBracket, 'Logout',
  '', userCategories);

export const profileMenuItems: ProfileMenuItem[] = [
  settings,
  connectionAndSecurity,
  manageDeliveryPersons,
  manageCustomers,
  manageDeliveryServices,
  manageBusinesses,
  manageAdmins,
  manageProducts,
  manageMenus,
  orderHistory,
  paymentMethods,
  messageCenter,
  // faq,
  logout
];
