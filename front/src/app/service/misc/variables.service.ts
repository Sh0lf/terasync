import {Injectable} from "@angular/core";
import {Business} from "../../model/user/business";
import {DeliveryService} from "../../model/user/delivery.service";
import {Packaging} from "../../model/odSystem/packaging";

@Injectable({
  providedIn: 'root'
})
export class VariablesService {
  deliveryServices: DeliveryService[] = [];
  deliveryServicesCounter: number = 0;

  businesses: Business[] = [];
  selectedBusiness: Business | undefined;
  businessesCounter: number = 0;

  packagings: Packaging[] = [];
  packagingsCounter: number = 0;

  mainPromise: Promise<boolean> | undefined;
  constructor() {
  }

  setBusinesses(businesses: Business[]) {
    this.businesses = businesses;
  }

  setSelectedBusiness(business: Business) {
    this.selectedBusiness = business;
  }

  setDeliveryServices(deliveryServices: DeliveryService[]) {
    this.deliveryServices = deliveryServices;
  }

  getDeliveryServices() {
    return this.deliveryServices;
  }

  incrementDeliveryServicesCounter() {
    this.deliveryServicesCounter++;
  }

  getDeliveryServicesCounter() {
    return this.deliveryServicesCounter;
  }

  incrementBusinessesCounter() {
    this.businessesCounter++;
  }

  getBusinessesCounter() {
    return this.businessesCounter;
  }

  setMainPromise(promise: Promise<boolean>) {
    this.mainPromise = promise;
  }

  getMainPromise() {
    return this.mainPromise;
  }

  incrementPackagingsCounter() {
    this.packagingsCounter++;
  }

  getPackagingsCounter() {
    return this.packagingsCounter;
  }

  getPackagings() {
    return this.packagings;
  }

  setPackagings(packagings: Packaging[]) {
    this.packagings = packagings;
  }
}
