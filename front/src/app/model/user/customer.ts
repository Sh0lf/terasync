import {User} from "./user";

export abstract class Customer extends User{
  customerId: number;
  firstName: string;
  lastName: string;

  protected constructor(customerId: number, firstName: string, lastName: string, email: string, username: string, password: string, registrationDate: string) {
    super(email, username, password, registrationDate);
    this.customerId = customerId;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  // getName(): string {
  //   return this.firstName + " " + this.lastName;
  // }
  //
  // getUserId(): number {
  //   return this.customerId;
  // }

  public test() {
    return "test";
  }
}
