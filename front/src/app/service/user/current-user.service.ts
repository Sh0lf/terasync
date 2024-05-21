import {User} from "../../model/user/user";
import {Injectable} from "@angular/core";
import {Admin} from "../../model/user/admin";
import {Customer} from "../../model/user/customer";
import {DeliveryService} from "../../model/user/delivery.service";
import {DeliveryPerson} from "../../model/user/delivery.person";
import {Business} from "../../model/user/business";
import {Address} from "../../model/odSystem/address";
import {PaymentMethod} from "../../model/odSystem/payment.method";

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  private counter: number = 0;

  private _user!: User | undefined;
  private _admin!: Admin | undefined;
  private _customer!: Customer | undefined;
  private _business!: Business | undefined;
  private _deliveryPerson!: DeliveryPerson | undefined;
  private _deliveryService!: DeliveryService | undefined;

  private mainPromise!: Promise<boolean>;

  constructor() {
  }

  public getCounter(): number {
    return this.counter;
  }

  public incrementCounter(): void {
    this.counter++;
  }

  isLoggedIn(): boolean {
    return this._user !== undefined && this._user !== null;
  }

  getMainPromise(): Promise<boolean> {
    return this.mainPromise;
  }

  setMainPromise(mainPromise: Promise<boolean>): void {
    this.mainPromise = mainPromise;
  }

  get user(): User | undefined {
    return this._user;
  }

  set user(user: User | undefined) {
    this._user = user;
  }

  get admin(): Admin | undefined {
    return this._admin;
  }

  set admin(value: Admin| undefined) {
    this._admin = value;
  }

  get customer(): Customer | undefined {
    return this._customer;
  }

  set customer(value: Customer| undefined) {
    this._customer = value;
  }

  get business(): Business | undefined {
    return this._business;
  }

  set business(value: Business| undefined) {
    this._business = value;
  }

  get deliveryPerson(): DeliveryPerson | undefined {
    return this._deliveryPerson;
  }

  set deliveryPerson(value: DeliveryPerson| undefined) {
    this._deliveryPerson = value;
  }

  get deliveryService(): DeliveryService | undefined {
    return this._deliveryService;
  }

  set deliveryService(value: DeliveryService| undefined) {
    this._deliveryService = value;
  }

  getDefaultAddress(): Address | undefined {
    if(this.user != undefined) {
      for (let address of this.user?.addresses!) {
        if (address.defaultAddress) {
          return address;
        }
      }
    }
    return undefined;
  }

  getDefaultPaymentMethod(): PaymentMethod | undefined {
    if(this.user != undefined) {
      for (let payment of this.user?.paymentMethods!) {
        if (payment.defaultPaymentMethod) {
          return payment;
        }
      }
    }
    return undefined;
  }

  setUsersToNull() {
    this.user = undefined;
    this.admin = undefined;
    this.customer = undefined;
    this.business = undefined;
    this.deliveryPerson = undefined;
    this.deliveryService = undefined;
  }
}
