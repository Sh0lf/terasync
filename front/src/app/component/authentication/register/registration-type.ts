import {
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

export const customerRegistrationType = new RegistrationType('Create An Account', customerCategory, EditingUserType.USER, 'Register');
export const businessRegistrationType = new RegistrationType('Apply As A Business', businessCategory, EditingUserType.USER, 'Apply');
export const deliveryServiceRegistrationType = new RegistrationType('Apply As A Delivery Service', deliveryServiceCategory, EditingUserType.USER, 'Apply');
export const deliveryPersonRegistrationType = new RegistrationType('', deliveryPersonCategory, EditingUserType.ADMIN, 'Create Account');
export const registrationTypes =
  [
    customerRegistrationType,
    businessRegistrationType,
    deliveryServiceRegistrationType,
    deliveryPersonRegistrationType
  ];
