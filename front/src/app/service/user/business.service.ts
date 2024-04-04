import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Business } from '../../model/user/business';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class BusinessService extends UserService<Business> {

  constructor(http: HttpClient) {
    super(http, "business");
  }
}
