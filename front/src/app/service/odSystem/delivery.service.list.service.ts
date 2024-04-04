import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DeliveryServiceList } from '../../model/odSystem/delivery.service.list';
import { EntityService } from '../entity.service';

@Injectable({
  providedIn: 'root'
})
export class DeliveryServiceListService extends EntityService<DeliveryServiceList> {

  constructor(http: HttpClient) {
    super(http, "deliveryServiceList");
  }
}
