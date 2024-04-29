import {Address} from "../odSystem/address";

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
  addresses: Address[] = [];

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


  public static fromJson(json: any): User {
    let user: User = new User(json.email, json.username, json.password,
      json.userId, json.registrationDate,
      json.token, json.emailVerified,
      json.pfpImgPath, json.name)

    user.firstName = json.firstName;
    user.lastName = json.lastName;
    user.phone = json.phone;
    user.address = json.address;
    user.approved = json.approved;

    user.customerId = json.customerId;
    user.adminId = json.adminId;
    user.businessId = json.businessId;
    user.deliveryPersonId = json.deliveryPersonId;
    user.deliveryServiceId = json.deliveryServiceId;

    if(json.addresses != undefined) user.addresses = json.addresses;

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
}
