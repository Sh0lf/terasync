import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {CustomerOrderList} from "../../model/odSystem/customer.order.list";
import {EntityService} from "../entity.service";

@Injectable({
  providedIn: 'root'
})
export class CustomerOrderListService extends EntityService<CustomerOrderList> {

  constructor(http: HttpClient) {
    super(http, "customerOrderList");
  }
}