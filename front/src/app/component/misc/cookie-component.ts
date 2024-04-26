import {StorageKeys} from "./storage-keys";
import {CookieService} from "ngx-cookie-service";
import {UserService} from "../../service/user/user.service";
import {generateRandomToken} from "./functions";
import {HttpErrorResponse} from "@angular/common/http";
import {TokenByEmail} from "../../model/query/update/token-by-email";
import {
  adminCategory,
  businessCategory,
  customerCategory,
  deliveryPersonCategory, deliveryServiceCategory,
  UserCategory
} from "../../service/user/userCategories";
import {ActivatedRoute, Router} from "@angular/router";
import {CustomerService} from "../../service/user/customer.service";
import {BusinessService} from "../../service/user/business.service";
import {AdminService} from "../../service/user/admin.service";
import {DeliveryServiceService} from "../../service/user/delivery-service.service";
import {DeliveryPersonService} from "../../service/user/delivery-person.service";
import {User} from "../../model/user/user";
import {Observable} from "rxjs";
import {UserType} from "../../service/user/user.type";

export abstract class CookieComponent {
  // Logic fields
  isUserLoggedIn: boolean = false;
  isCustomerLoggedIn: boolean = false;
  isBusinessLoggedIn: boolean = false;
  isAdminLoggedIn: boolean = false;
  isDeliveryServiceLoggedIn: boolean = false;
  isDeliveryPersonLoggedIn: boolean = false;

  isPartnerLoggedIn: boolean = false;

  user!: User | undefined;

  // Services
  protected cookieService!: CookieService;

  protected customerService!: CustomerService;
  protected businessService!: BusinessService;
  protected adminService!: AdminService;
  protected deliveryServiceService!: DeliveryServiceService;
  protected deliveryPersonService!: DeliveryPersonService;


  constructor() {
  }

  fetchService(): UserService<any> {
    switch (this.getCurrentUserCategory().name) {
      case(adminCategory.name):
        return this.adminService;
      case(businessCategory.name):
        return this.businessService;
      case(customerCategory.name):
        return this.customerService;
      case(deliveryPersonCategory.name):
        return this.deliveryPersonService;
      case(deliveryServiceCategory.name):
        return this.deliveryServiceService;
    }
    return this.customerService;
  }

  checkUserLoggedIn(): void {
    this.isUserLoggedIn = this.hasUserToken();
  }

  routeToHome(router: Router, route: ActivatedRoute) {
    router.navigate([''], {relativeTo: route}).then();
  }

  isPartnerType(): boolean {
    return this.getCurrentUserCategory().userType === UserType.PARTNER;
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

  resetUserCategoryToCustomer(): void {
    this.cookieService.set(StorageKeys.USER_CATEGORY, JSON.stringify(customerCategory), 1, '/');
  }

  setUserByToken() {
    return this.fetchService().findUserByToken({token: this.getUserToken()})
      .subscribe({
      next: (user: User) => {
        if (user != null) {
          console.log(user);
          this.user = user;
        }
      }
    });
  }

  resetTokenByOldToken(): Promise<boolean> {
    let currentToken = this.cookieService.get(StorageKeys.USER_TOKEN);
    return new Promise<boolean>((resolve, reject) => {
      this.fetchService().updateTokenByOldToken({oldToken: currentToken, newToken: generateRandomToken()})
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

  resetTokenByEmail(email: string, newToken?: string): Promise<boolean> {
    let thisToken = "";
    if (newToken == null) {
      thisToken = generateRandomToken();
    } else {
      thisToken = newToken;
    }
    return new Promise<boolean>((resolve, reject) => {
      this.fetchService().updateTokenByEmail(new TokenByEmail(email, thisToken)).subscribe({
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
