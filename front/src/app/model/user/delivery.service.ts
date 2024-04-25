import {User} from "./user";

export class DeliveryService extends User {
  deliveryServiceId: number | undefined
  override name: string;

  constructor(name: string, email: string,
              username: string, password: string,
              deliveryServiceId?: number | undefined,
              registrationDate?: string | undefined,  token?: string | undefined) {
    super(email, username, password, deliveryServiceId, registrationDate, token);
    this.deliveryServiceId = deliveryServiceId;
    this.name = name;
  }

  getName(): string {
    return this.name;
  }

  getUserId(): number | undefined {
    return this.deliveryServiceId;
  }

  createInstance(jsonString: User): User {
    throw new Error("Method not implemented.");
  }
}
