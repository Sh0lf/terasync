import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {
  faArrowRightFromBracket, faBowlFood, faBurger,
  faChartSimple, faCreditCard, faGear,
  faLock, faMessage,
  faPeopleRoof, faQuestion, faTableList, faUser,
  faUserGroup
} from "@fortawesome/free-solid-svg-icons";
import {
  adminCategory,
  businessCategory,
  customerCategory, deliveryPersonCategory, deliveryServiceCategory,
  userCategories,
  UserCategory
} from "../../../service/user/userCategories";

export class ProfileMenuItem {
  icon: IconDefinition;
  name: string;
  link: string;
  isHeader: boolean;
  isFooter: boolean;

  class: string = "profile-menu-item";

  allowedUserCategories: UserCategory[] = []

  constructor(icon: IconDefinition, name: string, link: string, allowedUserCategories: UserCategory[], isHeader: boolean = false, isFooter: boolean = false) {
    this.icon = icon;
    this.name = name;
    this.link = link;
    this.allowedUserCategories = allowedUserCategories;
    this.isHeader = isHeader;
    this.isFooter = isFooter;
  }
}

export const settings = new ProfileMenuItem(faGear, 'Settings', '/user-account/user-settings', userCategories, true);
export const connectionAndSecurity = new ProfileMenuItem(faLock, 'Connection / Security', '/user-account/connection-security', userCategories);
export const manageUsers = new ProfileMenuItem(faPeopleRoof, 'Manage Users', '/user-account/manage-users', [adminCategory]);
export const manageDeliveryPersons = new ProfileMenuItem(faUserGroup, 'Manage Delivery Persons', '/user-account/manage-delivery-persons', [deliveryServiceCategory]);
export const manageProducts = new ProfileMenuItem(faBurger, 'Manage Products', '/user-account/manage-products', [businessCategory]);
export const manageMenus = new ProfileMenuItem(faBowlFood, 'Manage Menus', '/user-account/manage-menus', [businessCategory]);
export const orderHistory = new ProfileMenuItem(faTableList, 'Order History', '/user-account/order-history', [customerCategory]);
export const paymentMethods = new ProfileMenuItem(faCreditCard, 'Payment Methods', '/user-account/payment-methods', [customerCategory]);
export const faq = new ProfileMenuItem(faQuestion, 'FAQ', '/user-account/faq', userCategories);
export const messageCenter = new ProfileMenuItem(faMessage, 'Message Center', '/user-account/message-center', [adminCategory, customerCategory, deliveryPersonCategory]);
export const logout = new ProfileMenuItem(faArrowRightFromBracket, 'Logout', '', userCategories,false, true);

export const profileMenuItems: ProfileMenuItem[] = [
  settings,
  connectionAndSecurity,
  manageUsers,
  manageDeliveryPersons,
  manageProducts,
  manageMenus,
  orderHistory,
  paymentMethods,
  messageCenter,
  faq,
  logout
];
