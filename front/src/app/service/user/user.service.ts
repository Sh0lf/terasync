import {HttpClient} from "@angular/common/http";
import {EntityService} from "../entity.service";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {TokenByEmail} from "../../model/query/update/token-by-email";
import {TokenByOldToken} from "../../model/query/update/token-by-old-token";
import {PasswordByEmail} from "../../model/query/update/password-by-email";
import {ByToken} from "../../model/query/select/by-token";

@Injectable({
  providedIn: 'root'
})
export abstract class UserService<T> extends EntityService<T> {
  protected constructor(http: HttpClient, entity: string) {
    super(http, entity);
  }

  public findUserByEmail(email: String): Observable<T> {
    return this.http.get<T>(`${this.apiBackendUrl}/${this.entityName}/select-user-by-email/${email}`);
  }

  public findUserByToken(byToken: ByToken): Observable<T> {
    return this.http.post<T>(`${this.apiBackendUrl}/${this.entityName}/select-user-by-token`, byToken);
  }

  public updatePasswordByEmail(passwordByEmail: PasswordByEmail): Observable<number> {
    return this.http.post<number>(`${this.apiBackendUrl}/${this.entityName}/update-password-by-email`, passwordByEmail);
  }

  public updateTokenByEmail(tokenByEmail: TokenByEmail): Observable<number> {
    console.log(tokenByEmail);
    return this.http.post<number>(`${this.apiBackendUrl}/${this.entityName}/update-token-by-email`, tokenByEmail);
  }

  public updateTokenByOldToken(tokenByOldToken: TokenByOldToken): Observable<number> {
    return this.http.post<number>(`${this.apiBackendUrl}/${this.entityName}/update-token-by-old-token`, tokenByOldToken);
  }
}
