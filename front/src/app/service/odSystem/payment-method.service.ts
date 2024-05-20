import {Injectable} from "@angular/core";
import {EntityService} from "../entity.service";
import {HttpClient} from "@angular/common/http";
import {Address} from "../../model/odSystem/address";
import {PaymentMethod} from "../../model/odSystem/payment.method";

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService extends EntityService<PaymentMethod> {

  constructor(http: HttpClient) {
    super(http, "payment-method");
  }
}
