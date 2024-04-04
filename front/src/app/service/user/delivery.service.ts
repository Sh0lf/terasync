import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DeliveryService } from '../../model/user/delivery.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class DeliveryServiceService extends UserService<DeliveryService> {

  constructor(http: HttpClient) {
    super(http, "deliveryService");
  }
}
