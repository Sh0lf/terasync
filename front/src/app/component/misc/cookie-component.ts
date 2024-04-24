import {StorageKeys} from "./storage-keys";
import {CookieService} from "ngx-cookie-service";
import {UserService} from "../../service/user/user.service";
import {generateRandomToken} from "./functions";
import {HttpErrorResponse} from "@angular/common/http";
import {TokenByEmail} from "../../model/query/token-by-email";
import {customerCategory, UserCategory} from "../../service/user/userCategories";
import {ActivatedRoute, Router} from "@angular/router";

export abstract class CookieComponent {
  // Services
  protected cookieService!: CookieService;


  constructor() {
  }

  routeToHome(router: Router, route: ActivatedRoute) {
    router.navigate([''], {relativeTo: route}).then();
  }

  getCurrentUserCategory(): UserCategory {
    try {
      return UserCategory.fromJson(this.cookieService.get(StorageKeys.USER_CATEGORY));
    } catch (e: any) {
    }
    return this.setCurrentUserCategory(customerCategory);
  }

  setCurrentUserCategory(userCategory: any): UserCategory {
    if (userCategory instanceof UserCategory) {
      this.setUserCategory(userCategory);
      return userCategory;
    } else {
      let realUserCategory = UserCategory.fromJson(userCategory);
      this.setUserCategory(realUserCategory);
      return realUserCategory;
    }
  }

  private setUserCategory(userCategory: UserCategory): void {
    this.cookieService.set(StorageKeys.USER_CATEGORY, JSON.stringify(userCategory), 1, '/');
  }

  setUserToken(token: string): void {
    this.cookieService.set(StorageKeys.USER_TOKEN, token, 1, '/');
  }

  getUserToken(): string {
    return this.cookieService.get(StorageKeys.USER_TOKEN);
  }

  hasUserToken(): boolean {
    return this.cookieService.check(StorageKeys.USER_TOKEN);
  }

  deleteUserToken(): void {
    this.cookieService.delete(StorageKeys.USER_TOKEN, '/');
  }

  resetTokenByOldToken(cookieService: CookieService, userService: UserService<any>): Promise<boolean> {
    let currentToken = cookieService.get(StorageKeys.USER_TOKEN);
    return new Promise<boolean>((resolve, reject) => {
      userService.updateTokenByOldToken({oldToken: currentToken, newToken: generateRandomToken()})
        .subscribe({
          next: (success: number) => {
            if (success == 1) {
              console.log('Token updated');
              this.setUserToken(generateRandomToken());
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
    });
  }

  // CREATE A TOKEN AND STORE THE HASH IN SESSION STORAGE
  resetTokenByEmail(cookieService: CookieService, userService: UserService<any>, email: string, newToken?: string): Promise<boolean> {
    let thisToken = "";
    if (newToken == null) {
      thisToken = generateRandomToken();
    } else {
      thisToken = newToken;
    }
    return new Promise<boolean>((resolve, reject) => {
      userService.updateTokenByEmail(new TokenByEmail(email, thisToken)).subscribe({
        next: (success: number) => {
          if (success == 1) {
            this.setUserToken(thisToken);
            console.log('Token updated');
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
    });
  }
}
