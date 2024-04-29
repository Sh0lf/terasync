import {User} from "../../model/user/user";
import {Injectable} from "@angular/core";
import {Admin} from "../../model/user/admin";
import {Customer} from "../../model/user/customer";
import {DeliveryService} from "../../model/user/delivery.service";
import {DeliveryPerson} from "../../model/user/delivery.person";
import {Business} from "../../model/user/business";
import {Address} from "../../model/odSystem/address";

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  private counter: number = 0;
  private pfpImgUrl: string | undefined;

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

  setPfpImgUrl(pfpImgUrl: string) {
    this.pfpImgUrl = pfpImgUrl;
  }

  getPfpImgUrl(): string | undefined {
    return this.pfpImgUrl;
  }

  getPfpImgPrefix(): string {
    return this._user?.userId + "-";
  }

  isLoggedIn(): boolean {
    return this._user !== undefined && this._user !== null;
  }

  hasPfpImg(): boolean {
    return this.isLoggedIn() &&
      this._user?.pfpImgPath !== null &&
      this._user?.pfpImgPath !== undefined &&
      this._user?.pfpImgPath.length > 0;
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

  set admin(value: Admin) {
    this._admin = value;
  }

  get customer(): Customer | undefined {
    return this._customer;
  }

  set customer(value: Customer) {
    this._customer = value;
  }

  get business(): Business | undefined {
    return this._business;
  }

  set business(value: Business) {
    this._business = value;
  }

  get deliveryPerson(): DeliveryPerson | undefined {
    return this._deliveryPerson;
  }

  set deliveryPerson(value: DeliveryPerson) {
    this._deliveryPerson = value;
  }

  get deliveryService(): DeliveryService | undefined {
    return this._deliveryService;
  }

  set deliveryService(value: DeliveryService) {
    this._deliveryService = value;
  }

  getDefaultAddress(): Address | undefined {
    if(this.user != undefined) {
      for (let address of this.user?.addresses) {
        if (address.defaultAddress) {
          return address;
        }
      }
    }
    return undefined;
  }
}
