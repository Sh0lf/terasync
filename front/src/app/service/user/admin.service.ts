import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Admin } from '../../model/user/admin';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService extends UserService<Admin> {

  constructor(http: HttpClient) {
    super(http, "admin");
  }
}
