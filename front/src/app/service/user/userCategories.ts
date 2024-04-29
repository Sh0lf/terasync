import {UserType} from "./user.type";
import {User} from "../../model/user/user";
import {Admin} from "../../model/user/admin";

export class UserCategory {
  name: string;
  userType: UserType;

  constructor(name: string, userType: UserType) {
    this.name = name;
    this.userType = userType;
  }

  static fromJson(json: string | null): UserCategory {
    let userCategory: UserCategory | undefined;
    if (json != null) {
      userCategory = userCategories.find(category => category.name === JSON.parse(json).name)
    }

    if (userCategory === undefined) {
      return customerCategory
    } else {
      return userCategory;
    }
  }
}

export const adminCategory = new UserCategory('Admin', UserType.PARTNER);
export const businessCategory = new UserCategory('Business', UserType.PARTNER);
export const customerCategory = new UserCategory('Customer', UserType.CUSTOMER);
export const deliveryPersonCategory = new UserCategory('Delivery Person', UserType.PARTNER);
export const deliveryServiceCategory = new UserCategory('Delivery Service', UserType.PARTNER);

export const userCategories: UserCategory[] = [
  adminCategory,
  businessCategory,
  customerCategory,
  deliveryPersonCategory,
  deliveryServiceCategory
];
