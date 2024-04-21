import {Injectable} from "@angular/core";
import {User} from "../../model/user/user";
import {InternalObjectService} from "../internal-object.service";

@Injectable({
  providedIn: 'root'
})
export abstract class InternalUserService<T extends User> extends InternalObjectService<T> {
  protected constructor() {
    super();
  }
}
