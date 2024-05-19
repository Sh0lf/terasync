import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Status } from '../../model/odSystem/status';
import { EntityService } from '../entity.service';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StatusService extends EntityService<Status> {

  constructor(http: HttpClient) {
    super(http, "status");
  }

  public findStatusByString(status: string): Observable<Status> {
    return this.http.get<Status>(`${this.apiBackendUrl}/${this.entityName}/find-status-by-string/${status}`);
  }
}
