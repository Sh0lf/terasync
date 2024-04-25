import {User} from "./user";

export class DeliveryPerson extends User{
  deliveryPersonId: number | undefined;
  firstName: string;
  lastName: string;
  deliveryServiceId: number;

  constructor(firstName: string, lastName: string, email: string,
              username: string, password: string, deliveryServiceId: number,
              deliveryPersonId?: number | undefined,
              registrationDate?: string | undefined,  token?: string | undefined) {
    super(email, username, password, deliveryPersonId, registrationDate, token);
    this.deliveryPersonId = deliveryPersonId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.deliveryServiceId = deliveryServiceId;
  }

  getName(): string {
    return this.firstName + " " + this.lastName;
  }

  getUserId(): number | undefined {
    return this.deliveryPersonId;
  }

  createInstance(jsonString: User): User {
    throw new Error("Method not implemented.");
  }
}
