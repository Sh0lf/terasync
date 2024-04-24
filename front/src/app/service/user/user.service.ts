import {HttpClient} from "@angular/common/http";
import {EntityService} from "../entity.service";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {TokenByEmail} from "../../model/query/token-by-email";
import {TokenByOldToken} from "../../model/query/token-by-old-token";

@Injectable({
  providedIn: 'root'
})
export abstract class UserService<T> extends EntityService<T> {
  protected constructor(http: HttpClient, entity: string) {
    super(http, entity);
  }

  public findUserByEmail(email: String): Observable<T> {
    return this.http.get<T>(`${this.apiBackendUrl}/${this.entityName}/find-by-email/${email}`);
  }

  public findUserByToken(token: String): Observable<T> {
    return this.http.get<T>(`${this.apiBackendUrl}/${this.entityName}/find-user-by-token/${token}`);
  }

  public updatePasswordByEmail(user: { email: string, password: string }): Observable<number> {
    return this.http.post<number>(`${this.apiBackendUrl}/${this.entityName}/update-password-by-email`, user);
  }

  public updateTokenByEmail(tokenByEmail: TokenByEmail): Observable<number> {
    console.log(tokenByEmail);
    return this.http.post<number>(`${this.apiBackendUrl}/${this.entityName}/update-token-by-email`, tokenByEmail);
  }

  public updateTokenByOldToken(tokenByOldToken: TokenByOldToken): Observable<number> {
    return this.http.post<number>(`${this.apiBackendUrl}/${this.entityName}/update-token-by-old-token`, tokenByOldToken);
  }
}
