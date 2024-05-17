import {Injectable} from "@angular/core";
import {Business} from "../../model/user/business";

@Injectable({
  providedIn: 'root'
})
export class VariablesService {
  constructor() {
  }

  businesses: Business[] = [];
  selectedBusiness: Business | undefined;

  counter: number = 0;
  mainPromise: Promise<boolean> | undefined;

  setBusinesses(businesses: Business[]) {
    this.businesses = businesses;
  }

  setSelectedBusiness(business: Business) {
    this.selectedBusiness = business;
  }

  incrementCounter() {
    this.counter++;
  }

  getCounter() {
    return this.counter;
  }

  setMainPromise(promise: Promise<boolean>) {
    this.mainPromise = promise;
  }

  getMainPromise() {
    return this.mainPromise;
  }
}
