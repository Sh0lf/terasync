import {User} from "./user";

export class Customer extends User {
  customerId: number | undefined;
  firstName: string;
  lastName: string;
  emailVerified: boolean | undefined;

  constructor(firstName: string, lastName: string, email: string,
              username: string, password: string,
              customerId?: number | undefined,
              emailVerified?: boolean | undefined,
              registrationDate?: string | undefined, token?: string | undefined) {
    super(email, username, password, customerId, registrationDate, token);
    this.customerId = customerId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.emailVerified = emailVerified;
  }

  createInstance(jsonString: Customer): Customer {
    return new Customer(
      jsonString.firstName, jsonString.lastName, jsonString.email,
      jsonString.username, jsonString.password,
      jsonString.customerId, jsonString.emailVerified,
      jsonString.registrationDate, jsonString.token
    )
  }
}
