import {User} from "./user";

export class Customer extends User {
  customerId: number | undefined;
  firstName: string;
  lastName: string;

  constructor(firstName: string, lastName: string, email: string,
              username: string, password: string,
              customerId?: number | undefined,
              registrationDate?: string | undefined, token?: string | undefined,
              emailVerified?: boolean | undefined, pfpImgPath?: string | undefined) {
    super(email, username, password, customerId, registrationDate, token, emailVerified, pfpImgPath);
    this.customerId = customerId;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
