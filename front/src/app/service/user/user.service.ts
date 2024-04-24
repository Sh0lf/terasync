import {HttpClient} from "@angular/common/http";
import {EntityService} from "../entity.service";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export abstract class UserService<T> extends EntityService<T> {
  protected constructor(http: HttpClient, entity: string) {
    super(http, entity);
  }

  public findUserByEmail(email: String): Observable<T> {
    return this.http.get<T>(`${this.apiServerUrl}/${this.entityName}/find-by-email/${email}`);
  }

  public findUserByToken(token: String): Observable<T> {
    return this.http.get<T>(`${this.apiServerUrl}/${this.entityName}/find-user-by-token/${token}`);
  }

  public updatePasswordByEmail(user: { email: string, password: string }): Observable<number> {
    return this.http.post<number>(`${this.apiServerUrl}/${this.entityName}/update-password`, user);
  }

  public updateTokenByEmail(user: {email: String, newToken: String}): Observable<number> {
    return this.http.post<number>(`${this.apiServerUrl}/${this.entityName}/update-token-by-email`, user);
  }

  public updateTokenByOldToken(tokenByOldToken: {oldToken: String, newToken: String}): Observable<number> {
    return this.http.post<number>(`${this.apiServerUrl}/${this.entityName}/update-token-by-old-token`, tokenByOldToken);
  }
}
