import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Status } from '../../model/odSystem/status';
import { EntityService } from '../entity.service';

@Injectable({
  providedIn: 'root'
})
export class StatusService extends EntityService<Status> {

  constructor(http: HttpClient) {
    super(http, "status");
  }
}
