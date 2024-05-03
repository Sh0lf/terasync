import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {
  faArrowRightFromBracket, faBowlFood, faBurger,
  faChartSimple, faCreditCard,
  faLock, faMessage,
  faPeopleRoof, faQuestion, faTableList,
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

export const activities = new ProfileMenuItem(faChartSimple, 'Activities', '', userCategories,true, false);
export const connectionAndSecurity = new ProfileMenuItem(faLock, 'Connection / Security', '/connection-security', userCategories);
export const manageUsers = new ProfileMenuItem(faPeopleRoof, 'Manage Users', '', [adminCategory]);
export const manageDeliveryPersons = new ProfileMenuItem(faUserGroup, 'Manage Delivery Persons', '', [deliveryServiceCategory]);
export const manageProducts = new ProfileMenuItem(faBurger, 'Manage Products', '/manage-products', [businessCategory]);
export const manageMenus = new ProfileMenuItem(faBowlFood, 'Manage Menus', '/manage-menus', [businessCategory]);
export const orderHistory = new ProfileMenuItem(faTableList, 'Order History', '/order-history', [customerCategory]);
export const paymentMethods = new ProfileMenuItem(faCreditCard, 'Payment Methods', '', [customerCategory]);
export const faq = new ProfileMenuItem(faQuestion, 'FAQ', '', userCategories);
export const messageCenter = new ProfileMenuItem(faMessage, 'Message Center', '', [adminCategory, customerCategory, deliveryPersonCategory]);
export const logout = new ProfileMenuItem(faArrowRightFromBracket, 'Logout', '', userCategories,false, true);

export const profileMenuItems: ProfileMenuItem[] = [
  activities,
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
