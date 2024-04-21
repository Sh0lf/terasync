import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Customer} from "../../model/user/customer";
import {UserService} from "./user.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends UserService<Customer> {

  constructor(http: HttpClient) {
    super(http, "customer");
  }

  public verifyEmail(email: String): Observable<number> {
    return this.http.get<number>(`${this.apiServerUrl}/${this.entityName}/verify-email/${email}`);
  }
}
