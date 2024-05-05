import {Address} from "../odSystem/address";
import {CustomerOrder} from "../odSystem/customer.order";
import {DeliveryServiceList} from "../odSystem/delivery.service.list";
import {ProductMenu} from "../odSystem/product.menu";
import {Product} from "../odSystem/product";
import {RatingList} from "../rating.list";
import {DeliveryPerson} from "./delivery.person";

export class User {
  userId: number | undefined;
  name: string | undefined;

  email: string;
  username: string;
  password: string;

  registrationDate: string | undefined;
  token: string | undefined;
  emailVerified: boolean | undefined;
  pfpImgPath: string | undefined;

  // FIELDS FROM INHERITING CLASSES
  firstName: string | undefined;
  lastName: string | undefined;
  phone: string | undefined;
  address: string | undefined;
  approved: boolean | undefined;

  // ALL ID FIELDS
  customerId: number | undefined;
  adminId: number | undefined;
  businessId: number | undefined;
  deliveryPersonId: number | undefined;
  deliveryServiceId: number | undefined;

  // CHILD TABLES
  // CUSTOMER
  addresses: Address[] | undefined = [];

  // CUSTOMER - BUSINESS - DELIVERY PERSON - DELIVERY SERVICE
  customerOrders: CustomerOrder[] | undefined = [];

  // BUSINESS - DELIVERY SERVICE
  deliveryServiceLists: DeliveryServiceList[] | undefined = [];

  // DELIVERY SERVICE
  deliveryPeople: DeliveryPerson[] | undefined= [];

  // BUSINESS
  productMenus: ProductMenu[] | undefined = [];
  products: Product[] | undefined = [];
  ratingLists: RatingList[] | undefined = [];

  // PFP IMAGE URL (COMPUTED WHEN NEEDED)
  pfpImgUrl: string | undefined;

  protected constructor(email: string, username: string, password: string,
                        userId?: number, registrationDate?: string,
                        token?: string, emailVerified?: boolean,
                        pfpImgPath?: string, name?: string) {
    this.userId = userId;
    this.name = name;

    this.email = email;
    this.username = username;
    this.password = password;

    this.registrationDate = registrationDate;
    this.token = token;
    this.emailVerified = emailVerified;
    this.pfpImgPath = pfpImgPath;
  }


  public static fromJson(jsonUser: User): User {
    let user: User = new User(jsonUser.email, jsonUser.username, jsonUser.password,
      jsonUser.userId, jsonUser.registrationDate,
      jsonUser.token, jsonUser.emailVerified,
      jsonUser.pfpImgPath, jsonUser.name)

    user.firstName = jsonUser.firstName;
    user.lastName = jsonUser.lastName;
    user.phone = jsonUser.phone;
    user.address = jsonUser.address;
    user.approved = jsonUser.approved;

    user.customerId = jsonUser.customerId;
    user.adminId = jsonUser.adminId;
    user.businessId = jsonUser.businessId;
    user.deliveryPersonId = jsonUser.deliveryPersonId;
    user.deliveryServiceId = jsonUser.deliveryServiceId;

    user.addresses = Address.initializeAddresses(jsonUser);
    user.customerOrders = CustomerOrder.initializeCustomerOrders(jsonUser);
    user.deliveryServiceLists = DeliveryServiceList.initializeDeliveryServiceLists(jsonUser);
    user.productMenus = ProductMenu.initializeProductMenus(jsonUser);
    user.products = Product.initializeProducts(jsonUser);
    user.ratingLists = RatingList.initializeRatingLists(jsonUser);

    // user.deliveryPeople = DeliveryPerson.initializeDeliveryPeople(jsonUser);

    return user;
  }

  setName(name: string) {
    this.name = name;
  }

  setFirstName(firstName: string) {
    this.firstName = firstName;
  }

  setLastName(lastName: string) {
    this.lastName = lastName;
  }

  setPhone(phone: string) {
    this.phone = phone;
  }

  setAddress(address: string) {
    this.address = address;
  }

  setApproved(approved: boolean) {
    this.approved = approved;
  }

  setDeliveryServiceId(deliveryServiceId: number) {
    this.deliveryServiceId = deliveryServiceId;
  }

  setPfpImgPath(pfpImgPath: string) {
    this.pfpImgPath = pfpImgPath;
  }

  setToken(token: string) {
    this.token = token;
  }

  setEmailVerified(emailVerified: boolean) {
    this.emailVerified = emailVerified;
  }

  setUserId(userId: number) {
    this.userId = userId;
  }

  setRegistrationDate(registrationDate: string) {
    this.registrationDate = registrationDate;
  }

  setUsername(username: string) {
    this.username = username;
  }

  setPassword(password: string) {
    this.password = password;
  }

  setEmail(email: string) {
    this.email = email;
  }

  setPfpImgUrl(pfpImgUrl: string) {
    this.pfpImgUrl = pfpImgUrl;
  }

  hasPfpImg(): boolean {
    return this.pfpImgPath !== null &&
      this.pfpImgPath !== undefined &&
      this.pfpImgPath.length > 0;
  }

  getPfpImgPrefix(): string {
    return this.userId + "-";
  }

  clearLists() {
    // CUSTOMER
    this.addresses = undefined;

    // CUSTOMER - BUSINESS - DELIVERY PERSON - DELIVERY SERVICE
    this.customerOrders = undefined;

    // BUSINESS - DELIVERY SERVICE
    this.deliveryServiceLists = undefined;

    // DELIVERY SERVICE
    this.deliveryPeople = undefined;

    // BUSINESS
    this.productMenus = undefined;
    this.products = undefined;
    this.ratingLists = undefined;
  }
}
