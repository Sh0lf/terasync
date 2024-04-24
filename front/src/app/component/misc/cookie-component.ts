import {StorageKeys} from "./storage-keys";
import {CookieService} from "ngx-cookie-service";
import {UserService} from "../../service/user/user.service";
import {generateRandomToken} from "./functions";
import {HttpErrorResponse} from "@angular/common/http";

export abstract class CookieComponent {
  resetTokenCookie(cookieService: CookieService, userService: UserService<any>): Promise<boolean> {
    let currentToken = cookieService.get(StorageKeys.USER_TOKEN);
    return new Promise<boolean>((resolve, reject) => {
      userService.updateTokenByOldToken({oldToken: currentToken, newToken: generateRandomToken()})
        .subscribe( {
          next: (success: number) => {
            if (success == 1) {
              console.log('Token updated');
              cookieService.set(StorageKeys.USER_TOKEN, generateRandomToken());
              resolve(true);
            } else {
              console.error('Token not updated');
              resolve(false);
            }
          },
          error: (error: HttpErrorResponse) => {
            console.error('HTTP Error: Token not updated');
            resolve(false);
          }
        });
      cookieService.set(StorageKeys.USER_TOKEN, generateRandomToken());
    });
  }
}
