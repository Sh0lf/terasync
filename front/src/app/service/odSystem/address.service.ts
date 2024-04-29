import {Injectable} from "@angular/core";
import {EntityService} from "../entity.service";
import {HttpClient} from "@angular/common/http";
import {Address} from "../../model/odSystem/address";

@Injectable({
  providedIn: 'root'
})
export class AddressService extends EntityService<Address> {

  constructor(http: HttpClient) {
    super(http, "address");
  }
}
