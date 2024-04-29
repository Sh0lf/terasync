import {User} from "./user";

export class DeliveryPerson extends User{
  override deliveryPersonId: number | undefined;
  override firstName: string;
  override lastName: string;
  override deliveryServiceId: number;

  constructor(firstName: string, lastName: string, email: string,
              username: string, password: string, deliveryServiceId: number,
              deliveryPersonId?: number | undefined,
              registrationDate?: string | undefined,  token?: string | undefined,
              emailVerified?: boolean | undefined, pfpImgPath?: string | undefined) {
    super(email, username, password, deliveryPersonId, registrationDate, token, emailVerified, pfpImgPath);
    this.deliveryPersonId = deliveryPersonId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.deliveryServiceId = deliveryServiceId;
  }
}
