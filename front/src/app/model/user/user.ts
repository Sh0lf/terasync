import {Address} from "../odSystem/address";
import {jsonHelpUsage} from "@angular/cli/src/command-builder/utilities/json-help";

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

    this.initializeAddresses(user, jsonUser);

    return user;
  }

  private static initializeAddresses(user: User, jsonUser: User) {
    if(jsonUser.addresses != undefined) {
      for(let address of jsonUser.addresses) {
        user.addresses.push(Address.fromJson(address));
      }
    }
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
