import {HttpClient} from "@angular/common/http";
import {EntityService} from "../entity.service";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export abstract class UserService<T> extends EntityService<T> {
  protected constructor(http: HttpClient, entity: string) {
    super(http, entity);
  }
}
