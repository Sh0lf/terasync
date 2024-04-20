import {User} from "./user";

export class Customer extends User {
  customerId: number | undefined;
  firstName: string;
  lastName: string;

  constructor(firstName: string, lastName: string, email: string,
              username: string, password: string,
              customerId?: number | undefined, registrationDate?: string | undefined) {
    super(email, username, password, registrationDate);
    this.customerId = customerId;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  override getName(): string {
    return this.firstName + " " + this.lastName;
  }

  override getUserId(): number | undefined {
    return this.customerId;
  }

  // static fromJson(jsonCustomer: Customer): Customer {

  //   return new Customer(jsonCustomer.customerId,
  //     jsonCustomer.firstName, jsonCustomer.lastName,
  //     jsonCustomer.email, jsonCustomer.username,
  //     jsonCustomer.password, jsonCustomer.registrationDate);
  // }
  createInstance(jsonString: Customer): Customer {
    return new Customer(
      jsonString.firstName, jsonString.lastName, jsonString.email,
      jsonString.username, jsonString.password,
      jsonString.customerId, jsonString.registrationDate
    )
  }
}
