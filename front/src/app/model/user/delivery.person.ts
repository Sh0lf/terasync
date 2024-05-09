import {User} from "./user";
import {CustomerOrder} from "../odSystem/customer.order";
import {DeliveryService} from "./delivery.service";

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
              emailVerified?: boolean | undefined, pfpImgPath?: string | undefined, name?: string | undefined) {
    super(email, username, password, deliveryPersonId, registrationDate, token, emailVerified, pfpImgPath, name);
    this.deliveryPersonId = deliveryPersonId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.deliveryServiceId = deliveryServiceId;
  }

  static override fromJson(jsonDeliveryPerson: DeliveryPerson) {
    let deliveryPerson = new DeliveryPerson(jsonDeliveryPerson.firstName, jsonDeliveryPerson.lastName, jsonDeliveryPerson.email,
      jsonDeliveryPerson.username, jsonDeliveryPerson.password, jsonDeliveryPerson.deliveryServiceId,
      jsonDeliveryPerson.deliveryPersonId, jsonDeliveryPerson.registrationDate, jsonDeliveryPerson.token,
      jsonDeliveryPerson.emailVerified, jsonDeliveryPerson.pfpImgPath, jsonDeliveryPerson.name)

    deliveryPerson.customerOrders = CustomerOrder.initializeCustomerOrders(jsonDeliveryPerson);

    return deliveryPerson;
  }

  static initializeDeliveryPeople(jsonDeliveryService: DeliveryService) {
    let deliveryPeople: DeliveryPerson[] = [];

    if (jsonDeliveryService.deliveryPeople !== undefined) {
      for (let jsonDeliveryPerson of jsonDeliveryService.deliveryPeople) {
        deliveryPeople.push(DeliveryPerson.fromJson(jsonDeliveryPerson));
      }
    }

    return deliveryPeople;
  }
}
