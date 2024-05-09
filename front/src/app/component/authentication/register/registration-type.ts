import {
  adminCategory,
  businessCategory,
  customerCategory,
  deliveryPersonCategory,
  deliveryServiceCategory,
  UserCategory
} from "../../../service/user/userCategories";
import {EditingUserType} from "../../misc/editing-user-type";

export class RegistrationType {
  headerTitle: string;
  userCategory: UserCategory;
  editingUserType: EditingUserType;
  buttonTitle: string;


  constructor(headerTitle: string, userCategory: UserCategory, editingUserType: EditingUserType, buttonTitle: string) {
    this.headerTitle = headerTitle;
    this.userCategory = userCategory;
    this.editingUserType = editingUserType;
    this.buttonTitle = buttonTitle;
  }

  hasHeader() {
    return this.headerTitle.length > 0;
  }
}

export const customerRegistrationTypeUSER = new RegistrationType('Create An Account',
  customerCategory, EditingUserType.USER, 'Register');
export const customerRegistrationTypeADMIN = new RegistrationType('',
  customerCategory, EditingUserType.ADMIN, 'Create Account');
export const businessRegistrationTypeUSER = new RegistrationType('Apply As A Business',
  businessCategory, EditingUserType.USER, 'Apply');
export const businessRegistrationTypeADMIN = new RegistrationType('',
  businessCategory, EditingUserType.ADMIN, 'Create Account');
export const deliveryServiceRegistrationTypeUSER = new RegistrationType('Apply As A Delivery Service',
  deliveryServiceCategory, EditingUserType.USER, 'Apply');
export const deliveryServiceRegistrationTypeADMIN = new RegistrationType('',
  deliveryServiceCategory, EditingUserType.ADMIN, 'Create Account');
export const deliveryPersonRegistrationTypeADMIN = new RegistrationType('',
  deliveryPersonCategory, EditingUserType.ADMIN, 'Create Account');
export const adminRegistrationTypeADMIN = new RegistrationType('',
  adminCategory, EditingUserType.ADMIN, 'Create Account');

export const registrationTypes =
  [
    customerRegistrationTypeUSER,
    businessRegistrationTypeUSER,
    deliveryServiceRegistrationTypeUSER,
    deliveryPersonRegistrationTypeADMIN
  ];
