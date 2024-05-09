import {UserType} from "./user.type";

export class UserCategory {
  name: string;
  pluralName: string;
  userType: UserType;

  constructor(name: string, pluralName: string, userType: UserType) {
    this.name = name;
    this.pluralName = pluralName;
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

  getFormattedName(): string {
    return this.name.toLowerCase().replace(new RegExp('\\s'), "-");
  }

  getFormattedPluralName(): string {
    return this.pluralName.toLowerCase().replace(new RegExp('\\s'), "-");
  }
}

export const adminCategory = new UserCategory('Admin', 'Admins', UserType.PARTNER);
export const businessCategory = new UserCategory('Business', 'Businesses', UserType.PARTNER);
export const customerCategory = new UserCategory('Customer', 'Customers', UserType.CUSTOMER);
export const deliveryPersonCategory = new UserCategory('Delivery Person', 'Deliverymen', UserType.PARTNER);
export const deliveryServiceCategory = new UserCategory('Delivery Service', 'Delivery Services', UserType.PARTNER);

export const userCategories: UserCategory[] = [
  adminCategory,
  businessCategory,
  customerCategory,
  deliveryPersonCategory,
  deliveryServiceCategory
];
