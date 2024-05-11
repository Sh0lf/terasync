import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Business } from '../../model/user/business';
import { UserService } from './user.service';
import {ApprovementByEmail} from "../../model/query/update/approvement-by-email";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BusinessService extends UserService<Business> {

  constructor(http: HttpClient) {
    super(http, "business");
  }

  updateApprovalByEmail(approvementByEmail: ApprovementByEmail): Observable<number> {
    return this.http.post<number>(`${this.apiBackendUrl}/${this.entityName}/approve-by-email`, approvementByEmail);
  }
}
