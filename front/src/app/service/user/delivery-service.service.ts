import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DeliveryService } from '../../model/user/delivery.service';
import { UserService } from './user.service';
import {ApprovementByEmail} from "../../model/query/update/approvement-by-email";

@Injectable({
  providedIn: 'root'
})
export class DeliveryServiceService extends UserService<DeliveryService> {

  constructor(http: HttpClient) {
    super(http, "delivery-service");
  }

  updateApprovalByEmail(approvementByEmail: ApprovementByEmail) {
    return this.http.post<number>(`${this.apiBackendUrl}/${this.entityName}/approve-by-email`, approvementByEmail);
  }
}
