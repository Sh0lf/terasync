import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomerOrder } from '../../model/odSystem/customer.order';
import { EntityService } from '../entity.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerOrderService extends EntityService<CustomerOrder> {

  constructor(http: HttpClient) {
    super(http, "customer-order");
  }

  public getOrderTotal(order: CustomerOrder | undefined) : number {
    let total: number = 0
    if (order) {
      let orderLists = order.customerOrderLists
      for (let orderList of orderLists) {
        total = total + (orderList.product?.price! * orderList.quantity);
      }
    }
    return total
  }
}
