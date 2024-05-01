import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import {DeliveryPerson} from "../../model/user/delivery.person";

@Injectable({
  providedIn: 'root'
})
export class DeliveryPersonService extends UserService<DeliveryPerson> {

  constructor(http: HttpClient) {
    super(http, "delivery-person");
  }
}
