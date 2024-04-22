import {HttpClient} from "@angular/common/http";
import {EntityService} from "../entity.service";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Customer} from "../../model/user/customer";

@Injectable({
  providedIn: 'root'
})
export abstract class UserService<T> extends EntityService<T> {
  protected constructor(http: HttpClient, entity: string) {
    super(http, entity);
  }

  public findUserByEmail(email: String): Observable<T> {
    return this.http.get<T>(`${this.apiServerUrl}/${this.entityName}/findByEmail/${email}`);
  }

  public updatePassword(email: String, newPassword: String): Observable<number> {
    return this.http.get<number>(`${this.apiServerUrl}/${this.entityName}/update-password/${email}/${newPassword}`);
  }

  public updateToken(email: String, newToken: String): Observable<number> {
    return this.http.get<number>(`${this.apiServerUrl}/${this.entityName}/update-token/${email}/${newToken}`);
  }
}
