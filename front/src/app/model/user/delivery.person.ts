import {User} from "./user";
import {CustomerOrder} from "../odSystem/customer.order";

export class DeliveryPerson extends User {
  override deliveryPersonId: number | undefined;
  override firstName: string;
  override lastName: string;
  override deliveryServiceId: number;

  override customerOrders: CustomerOrder[] = [];

  constructor(firstName: string, lastName: string, email: string,
              username: string, password: string, deliveryServiceId: number,
              deliveryPersonId?: number | undefined,
              registrationDate?: string | undefined, token?: string | undefined,
              emailVerified?: boolean | undefined, pfpImgPath?: string | undefined) {
    super(email, username, password, deliveryPersonId, registrationDate, token, emailVerified, pfpImgPath);
    this.deliveryPersonId = deliveryPersonId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.deliveryServiceId = deliveryServiceId;
  }

  static override fromJson(jsonDeliveryPerson: DeliveryPerson) {
    return new DeliveryPerson(jsonDeliveryPerson.firstName, jsonDeliveryPerson.lastName, jsonDeliveryPerson.email,
      jsonDeliveryPerson.username, jsonDeliveryPerson.password, jsonDeliveryPerson.deliveryServiceId,
      jsonDeliveryPerson.deliveryPersonId, jsonDeliveryPerson.registrationDate, jsonDeliveryPerson.token,
      jsonDeliveryPerson.emailVerified, jsonDeliveryPerson.pfpImgPath);
  }

  // static override initializeDeliveryPeople(jsonUser: { deliveryPeople: DeliveryPerson[] }): DeliveryPerson[] {
  //   let deliveryPeople: DeliveryPerson[] = [];
  //   if (jsonUser.deliveryPeople) {
  //     for (let deliveryPerson of jsonUser.deliveryPeople) {
  //       deliveryPeople.push(DeliveryPerson.fromJson(deliveryPerson));
  //     }
  //   }
  //   return deliveryPeople
  // }

  static test() {
    console.log("DeliveryPerson.test() called")
  }
}
