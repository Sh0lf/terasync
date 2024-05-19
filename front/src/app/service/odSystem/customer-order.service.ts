import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomerOrder } from '../../model/odSystem/customer.order';
import { EntityService } from '../entity.service';
import {Observable} from "rxjs";
import {StatusIdByCustomerOrderId} from "../../model/query/update/status-id-by-customer-order-id";
import {DeliveryPersonIdByCustomerOrderId} from "../../model/query/update/delivery-person-id-by-customer-order-id";
import {TempByCustomerOrderId} from "../../model/query/update/temp-by-customer-order-id";

@Injectable({
  providedIn: 'root'
})
export class CustomerOrderService extends EntityService<CustomerOrder> {

  constructor(http: HttpClient) {
    super(http, "customer-order");
  }

  public updateStatusIdByCustomerOrderId(statusIdByCustomerOrderId: StatusIdByCustomerOrderId): Observable<number> {
    return this.http.post<number>(`${this.apiBackendUrl}/${this.entityName}/update-status-id-by-customer-order-id`, statusIdByCustomerOrderId);
  }

  public updateDeliveryPersonIdByCustomerOrderId(deliveryPersonIdByCustomerOrderId: DeliveryPersonIdByCustomerOrderId): Observable<number> {
    console.log(deliveryPersonIdByCustomerOrderId)
    return this.http.post<number>(`${this.apiBackendUrl}/${this.entityName}/update-delivery-person-id-by-customer-order-id`, deliveryPersonIdByCustomerOrderId);
  }

  public updateDeliveryTimeByCustomerOrderId(customerOrderId: number): Observable<string> {
    return this.http.get<string>(`${this.apiBackendUrl}/${this.entityName}/update-delivery-time/${customerOrderId}`);
  }

  public updateMinTempByCustomerOrderId(tempByCustomerOrderId: TempByCustomerOrderId): Observable<number> {
    return this.http.post<number>(`${this.apiBackendUrl}/${this.entityName}/update-min-temp-by-customer-order-id`, tempByCustomerOrderId);
  }

  public updateMaxTempByCustomerOrderId(tempByCustomerOrderId: TempByCustomerOrderId): Observable<number> {
    return this.http.post<number>(`${this.apiBackendUrl}/${this.entityName}/update-max-temp-by-customer-order-id`, tempByCustomerOrderId);
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
