import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Customer} from "../../model/user/customer";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends UserService<Customer> {

  constructor(http: HttpClient) {
    super(http, "customer");
  }
}
