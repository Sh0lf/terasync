import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {CustomerOrderList} from "../../model/odSystem/customer.order.list";
import {EntityService} from "../entity.service";
import {Observable} from "rxjs";
import {CustomerOrder} from "../../model/odSystem/customer.order";

@Injectable({
  providedIn: 'root'
})
export class CustomerOrderListService extends EntityService<CustomerOrderList> {

  constructor(http: HttpClient) {
    super(http, "customer-order-list");
  }
}
