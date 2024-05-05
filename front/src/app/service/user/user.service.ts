import {HttpClient} from "@angular/common/http";
import {EntityService} from "../entity.service";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {TokenByEmail} from "../../model/query/update/token-by-email";
import {TokenByOldToken} from "../../model/query/update/token-by-old-token";
import {PasswordByEmail} from "../../model/query/update/password-by-email";
import {ByToken} from "../../model/query/select/by-token";
import {User} from "../../model/user/user";
import {PfpImgPathByEmail} from "../../model/query/update/pfp-img-path-by-email";

@Injectable({
  providedIn: 'root'
})
export abstract class UserService<T extends User> extends EntityService<T> {

  protected constructor(http: HttpClient, entity: string) {
    super(http, entity);
  }

  public findUserByEmail(email: String): Observable<T> {
    return this.http.get<T>(`${this.apiBackendUrl}/${this.entityName}/select-user-by-email/${email}`);
  }

  public findUserByToken(byToken: ByToken): Observable<T> {
    return this.http.post<T>(`${this.apiBackendUrl}/${this.entityName}/select-user-by-token`, byToken);
  }

  public verifyEmail(email: String): Observable<number> {
    return this.http.get<number>(`${this.apiBackendUrl}/${this.entityName}/verify-email/${email}`);
  }

  public updatePasswordByEmail(passwordByEmail: PasswordByEmail): Observable<number> {
    return this.http.post<number>(`${this.apiBackendUrl}/${this.entityName}/update-password-by-email`, passwordByEmail);
  }

  public updateTokenByEmail(tokenByEmail: TokenByEmail): Observable<number> {
    return this.http.post<number>(`${this.apiBackendUrl}/${this.entityName}/update-token-by-email`, tokenByEmail);
  }

  public updateTokenByOldToken(tokenByOldToken: TokenByOldToken): Observable<number> {
    return this.http.post<number>(`${this.apiBackendUrl}/${this.entityName}/update-token-by-old-token`, tokenByOldToken);
  }

  public updatePfpImgPathByEmail(pfpImgPathByEmail: PfpImgPathByEmail): Observable<number> {
    return this.http.post<number>(`${this.apiBackendUrl}/${this.entityName}/update-pfp-img-path-by-email`, pfpImgPathByEmail);
  }

  public deleteUserAndPfpImg(user: T): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.deleteEntity(user.userId!).subscribe({
        next: () => {
          console.log(`User deleted: ${user.userId!}`);
          if(user.pfpImgPath != undefined && user.pfpImgPath.length > 0) {
            this.deleteFile(user.pfpImgPath).subscribe({
              next: (response: boolean) => {
                console.log(`Pfp img deleted: ${response} for user: ${user.userId!}` );
              },
              error: (error: any) => {
                console.error(error);
              }
            });
          }
          resolve(true);
        },
        error: (error: any) => {
          console.log(`User with id ${user.userId!} can't be deleted`)
          resolve(false);
        }
      })
    });
  }
}
