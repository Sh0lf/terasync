import {StorageKeys} from "./storage-keys";
import {CookieService} from "ngx-cookie-service";
import {UserService} from "../../service/user/user.service";
import {generateRandomToken} from "./functions";
import {HttpErrorResponse, HttpEvent, HttpEventType} from "@angular/common/http";
import {TokenByEmail} from "../../model/query/update/token-by-email";
import {
  adminCategory,
  businessCategory,
  customerCategory,
  deliveryPersonCategory,
  deliveryServiceCategory,
  UserCategory
} from "../../service/user/userCategories";
import {ActivatedRoute, Router} from "@angular/router";
import {CustomerService} from "../../service/user/customer.service";
import {BusinessService} from "../../service/user/business.service";
import {AdminService} from "../../service/user/admin.service";
import {DeliveryServiceService} from "../../service/user/delivery-service.service";
import {DeliveryPersonService} from "../../service/user/delivery-person.service";
import {User} from "../../model/user/user";
import {UserType} from "../../service/user/user.type";
import {Customer} from "../../model/user/customer";
import {Admin} from "../../model/user/admin";
import {Business} from "../../model/user/business";
import {DeliveryPerson} from "../../model/user/delivery.person";
import {DeliveryService} from "../../model/user/delivery.service";
import {CurrentUserService} from "../../service/user/current-user.service";

export abstract class CookieComponent {
  // Services
  protected cookieService!: CookieService;

  protected customerService!: CustomerService;
  protected businessService!: BusinessService;
  protected adminService!: AdminService;
  protected deliveryServiceService!: DeliveryServiceService;
  protected deliveryPersonService!: DeliveryPersonService;
  protected currentUserService!: CurrentUserService;

  protected router!: Router;
  protected route!: ActivatedRoute;

  // User Categories
  protected readonly businessCategory = businessCategory;
  protected readonly deliveryServiceCategory = deliveryServiceCategory;
  protected readonly customerCategory = customerCategory;
  protected readonly deliveryPersonCategory = deliveryPersonCategory;
  protected readonly adminCategory = adminCategory;

  // Footer variable
  protected footerTopMinValue: number = 0;
  protected position: string = "static";

  constructor() {
  }

  fetchUserService(): UserService<any> {
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

  private setCurrentUser(user: User) {
    let name = this.getCurrentUserCategory().name;
    if (name === adminCategory.name) {
      this.currentUserService.admin = user as Admin;
    } else if (name === businessCategory.name) {
      this.currentUserService.business = user as Business;
    } else if (name === customerCategory.name) {
      this.currentUserService.customer = user as Customer;
    } else if (name === deliveryPersonCategory.name) {
      this.currentUserService.deliveryPerson = user as DeliveryPerson;
    } else if (name === deliveryServiceCategory.name) {
      this.currentUserService.deliveryService = user as DeliveryService;
    }
  }

  loggedInPage() {
    if (!this.currentUserService.isLoggedIn()) {
      this.routeToHome().then();
    }
  }

  customerPage() {
    if (!this.isCustomerCategory() && !this.currentUserService.isLoggedIn()) {
      this.routeToHome().then();
    }
  }

  routeToHome(): Promise<boolean>  {
    return this.router.navigate([''], {relativeTo: this.route});
  }

  routeTo(path: string) {
    this.router.navigate([path], {relativeTo: this.route}).then();
  }

  isPartnerType(): boolean {
    return this.getCurrentUserCategory().userType === UserType.PARTNER;
  }

  isBusinessCategory() {
    return this.getCurrentUserCategory().name === businessCategory.name;
  }

  isDeliveryServiceCategory() {
    return this.getCurrentUserCategory().name === deliveryServiceCategory.name;
  }

  isCustomerCategory() {
    return this.getCurrentUserCategory().name === customerCategory.name;
  }

  isDeliveryPersonCategory() {
    return this.getCurrentUserCategory().name === deliveryPersonCategory.name;
  }

  isAdminCategory() {
    return this.getCurrentUserCategory().name === adminCategory.name;
  }

  getPartnerType(): string {
    return this.getCurrentUserCategory().name;
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

  userHasFLName() {
    return this.isCustomerCategory() || this.isDeliveryPersonCategory();
  }

  initializeUserByToken(): Promise<boolean> {
    this.currentUserService.incrementCounter();
    return new Promise<boolean>((resolve, reject) => {
      if (this.hasUserToken() && this.currentUserService.getCounter() == 1) {
        this.currentUserService.setMainPromise(new Promise<boolean>((resolve_sub, reject) => {
          this.fetchUserService().findUserByToken({token: this.getUserToken()})
            .subscribe({
              next: (jsonUser: User) => {
                if (jsonUser != null) {
                  this.initializeUser(jsonUser);

                  resolve_sub(true);
                  resolve(true);
                } else {
                  console.error('User not found');
                  resolve_sub(false);
                  resolve(false);
                }
              },
              error: (error: HttpErrorResponse) => {
                resolve_sub(false);
                resolve(false);
                console.error('HTTP Error: User not found');
              }
            });
        }));
      } else if (this.hasUserToken() && this.currentUserService.getCounter() > 1) {
        this.currentUserService.getMainPromise()?.then((success) => {
          resolve(success);
        });
      } else {
        resolve(false);
      }
    });
  }

  initializeUser(jsonUser: User) {
    this.currentUserService.user = User.fromJson(jsonUser);
    this.initializeUserPfpImgUrl().then();
    this.setCurrentUser(jsonUser);

    console.log(this.currentUserService.user!)
  }

  resetTokenByOldToken(): Promise<boolean> {
    let currentToken = this.cookieService.get(StorageKeys.USER_TOKEN);
    return new Promise<boolean>((resolve, reject) => {
      this.fetchUserService().updateTokenByOldToken({oldToken: currentToken, newToken: generateRandomToken()})
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
      this.fetchUserService().updateTokenByEmail(new TokenByEmail(email, thisToken)).subscribe({
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

  getUserByEmail(email: string): Promise<User | null> {
    return new Promise<User | null>((resolve, reject) => {
      this.fetchUserService().findUserByEmail(email).subscribe({
        next: (customer: Customer) => {
          resolve(customer);
        },
        error: (error: HttpErrorResponse) => {
          resolve(null);
        }
      });
    });
  }

  applyAs(userCategory: UserCategory) {
    this.setCurrentUserCategory(userCategory);
    this.router.navigate(['/register'], {relativeTo: this.route}).then();
  }

  handleFooterTopMinValue(entry: ResizeObserverEntry, staticVal: number = 0) {
    let calculatedValue = entry.contentRect.height + staticVal;

    if(calculatedValue > window.innerHeight) {
      this.position = 'static';
    } else {
      this.position = 'absolute';
      this.footerTopMinValue = Math.max(calculatedValue, window.innerHeight);
    }
  }

  private initializeUserPfpImgUrl(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      if (this.currentUserService.hasPfpImg()) {
        this.fetchUserService().downloadFiles(this.currentUserService.user?.pfpImgPath!).subscribe({
          next: (httpEvent: HttpEvent<Blob>) => {
            if (httpEvent.type === HttpEventType.Response) {
              const file: File = new File([httpEvent.body!], httpEvent.headers.get('File-Name')!,
                {type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`});
              this.currentUserService.setPfpImgUrl(URL.createObjectURL(file));
              resolve(true);
            }
          },
          error: (error: HttpErrorResponse) => {
            console.log("Error downloading file");
            resolve(false);
          }
        });
      } else {
        console.log("User does not have pfp img");
        resolve(false);
      }
    });
  }

  logoutOnClick() {
    this.deleteUserToken();
    this.resetUserCategoryToCustomer();
    this.currentUserService.setUsersToNull();
    this.routeToHome().then(() => {
      window.location.reload();
    });
  }
}
