import {Injectable} from "@angular/core";
import {Product} from "../../model/odSystem/product";
import {Business} from "../../model/user/business";
import {CustomerOrder} from "../../model/odSystem/customer.order";

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  basket: Map<number, number> = new Map<number, number>();
  business: Business | undefined;
  newCustomerOrder: CustomerOrder | undefined;

  constructor() {

  }

  getNewCustomerOrder() {
    return this.newCustomerOrder;
  }

  setNewCustomerOrder(customerOrder: CustomerOrder) {
    this.newCustomerOrder = customerOrder;
  }

  getBasket() {
    return this.basket;
  }

  setBasket(basket: Map<number, number>) {
    this.basket = basket;
  }

  setBusiness(business: Business) {
    this.business = business;
  }

  getBusiness() {
    return this.business;
  }
}
