import {UserType} from "./user.type";

export const Users = {
  ADMIN: {name: 'Admin', userType: UserType.PARTNER},
  BUSINESS: {name: 'Business', userType: UserType.PARTNER},
  CUSTOMER: {name: 'Customer', userType: UserType.CUSTOMER},
  DELIVERY_PERSON: {name: 'Delivery Person', userType: UserType.PARTNER},
  DELIVERY_SERVICE: {name: 'Delivery Service', userType: UserType.PARTNER}
}
