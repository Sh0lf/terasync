import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomerOrder } from '../../model/odSystem/customer.order';
import { EntityService } from '../entity.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerOrderService extends EntityService<CustomerOrder> {

  constructor(http: HttpClient) {
    super(http, "customerOrder");
  }
}
