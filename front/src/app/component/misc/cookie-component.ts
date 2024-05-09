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
import {Observable} from "rxjs";
import {EditableElement} from "./editable-element";

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
    return this.fetchUserServiceByCategory(this.getCurrentUserCategory());
  }

  fetchUserServiceByCategory(userCategory: UserCategory): UserService<any> {
    switch (userCategory.name) {
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

  private setCurrentUser(user: User, jsonUser: User) {
    switch (this.getCurrentUserCategory().name) {
      case(adminCategory.name):
        this.currentUserService.admin = user as Admin;
        this.initializeAllUsers();
        break;
      case(businessCategory.name):
        this.currentUserService.business = user as Business;
        break;
      case(customerCategory.name):
        this.currentUserService.customer = user as Customer;
        break;
      case(deliveryPersonCategory.name):
        this.currentUserService.deliveryPerson = user as DeliveryPerson;
        break;
      case(deliveryServiceCategory.name):
        this.currentUserService.deliveryService = user as DeliveryService;
        this.initializeDeliveryPeople(jsonUser.deliveryPeople!);
        break;
    }
  }

  loggedInPage() {
    if (!this.currentUserService.isLoggedIn()) {
      this.routeToHome().then();
    }
  }

  specificUserPage(...userCategories: UserCategory[]): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (!this.includesCurrentCategory(...userCategories) || !this.currentUserService.isLoggedIn()) {
        this.routeToHome().then();
        resolve(false);
      } else {
        resolve(true);
      }
    });
  }

  includesCurrentCategory(...userCategories: UserCategory[]): boolean {
    return userCategories.includes(this.getCurrentUserCategory());
  }

  routeToHome(): Promise<boolean> {
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

  isEditableElementRelevant(editableElement: EditableElement, userCategory: UserCategory): boolean {
    return editableElement.userCategories.includes(userCategory);
  }

  initializeUserByToken(): Promise<boolean> {
    this.currentUserService.incrementCounter();
    return new Promise<boolean>((resolve, reject) => {
      if (this.currentUserService.user != undefined) {
        resolve(true)
      } else if (this.hasUserToken() && this.currentUserService.getCounter() == 1) {
        this.currentUserService.setMainPromise(new Promise<boolean>((resolve_sub, reject) => {
          this.fetchUserService().findUserByToken({token: this.getUserToken()})
            .subscribe({
              next: (jsonUser: User) => {
                if (jsonUser != null) {
                  this.initializeUser(jsonUser);

                  resolve_sub(true);
                  resolve(true);
                } else {
                  console.log('User not found');
                  resolve_sub(false);
                  resolve(false);
                }
              },
              error: (error: HttpErrorResponse) => {
                resolve_sub(false);
                resolve(false);
                console.log('HTTP Error: User not found');
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
    this.setCurrentUser(this.currentUserService.user, jsonUser);

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

  getUserByEmail(email: string, userService: UserService<any>): Promise<User | null> {
    return new Promise<User | null>((resolve, reject) => {
      userService.findUserByEmail(email).subscribe({
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
    this.router.navigate([`/register/${userCategory.getFormattedName()}`], {relativeTo: this.route}).then();
  }

  handleFooterTopMinValue(entry: ResizeObserverEntry, staticVal: number = 0) {
    let calculatedValue = entry.contentRect.height + staticVal;

    if (calculatedValue > window.innerHeight) {
      this.position = 'static';
    } else {
      this.position = 'absolute';
      this.footerTopMinValue = Math.max(calculatedValue, window.innerHeight);
    }
  }

  private initializeUserPfpImgUrl(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      if (this.currentUserService.user?.hasPfpImg()) {
        this.fetchUserService().downloadFiles(this.currentUserService.user?.pfpImgPath!).subscribe({
          next: (httpEvent: HttpEvent<Blob>) => {
            if (httpEvent.type === HttpEventType.Response) {
              const file: File = new File([httpEvent.body!], httpEvent.headers.get('File-Name')!,
                {type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`});
              this.currentUserService.user?.setPfpImgUrl(URL.createObjectURL(file));
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

  initializeUsersPfpImgUrl(users: User[] | undefined, userService: UserService<any>): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      new Observable<number>((observer) => {
        let count = 0;
        // let deliveryPeople = this.currentUserService.user?.deliveryPeople!;
        if (users == undefined || users.length == 0) observer.next(count)

        for (let user of users!) {
          if (user.pfpImgPath != undefined && user.pfpImgPath.length > 0) {
            userService.downloadFiles(user.pfpImgPath).subscribe({
              next: (httpEvent: HttpEvent<Blob>) => {
                if (httpEvent.type === HttpEventType.Response) {
                  const file: File = new File([httpEvent.body!], httpEvent.headers.get('File-Name')!,
                    {type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`});
                  user.setPfpImgUrl(URL.createObjectURL(file));
                  observer.next(count++);
                }
              },
              error: (error: HttpErrorResponse) => {
                console.log("Error downloading file");
                observer.next(count++);
              }
            });
          } else {
            console.log("User does not have pfp img");
            observer.next(count++);
          }
        }
      }).subscribe({
        next: (count: number) => {
          if (count == users?.length) {
            resolve(true);
          }
        }
      });
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

  private initializeDeliveryPeople(jsonDeliveryPeople: DeliveryPerson[]) {
    let deliveryPeople: DeliveryPerson[] = [];
    for (let deliveryPerson of jsonDeliveryPeople) {
      deliveryPeople.push(DeliveryPerson.fromJson(deliveryPerson));
    }

    this.currentUserService.user?.setDeliveryPeople(deliveryPeople);
    this.initializeUsersPfpImgUrl(this.currentUserService.user?.deliveryPeople, this.deliveryPersonService).then();
  }

  private initializeCustomers(jsonCustomers: Customer[]) {
    let customers: Customer[] = [];
    for (let customer of jsonCustomers) {
      customers.push(Customer.fromJson(customer));
    }
    this.currentUserService.user?.setCustomers(customers);
    this.initializeUsersPfpImgUrl(this.currentUserService.user?.customers, this.customerService).then();
  }

  private initializeBusinesses(jsonBusinesses: Business[]) {
    let businesses: Business[] = [];
    for (let business of jsonBusinesses) {
      businesses.push(Business.fromJson(business));
    }
    this.currentUserService.user?.setBusinesses(businesses);
    this.initializeUsersPfpImgUrl(this.currentUserService.user?.businesses, this.businessService).then();
  }

  private initializeDeliveryServices(jsonDeliveryServices: DeliveryService[]) {
    let deliveryServices: DeliveryService[] = [];
    for (let deliveryService of jsonDeliveryServices) {
      deliveryServices.push(DeliveryService.fromJson(deliveryService));
    }
    this.currentUserService.user?.setDeliveryServices(deliveryServices);
    this.initializeUsersPfpImgUrl(this.currentUserService.user?.deliveryServices, this.deliveryServiceService).then();
  }

  private initializeAdmins(jsonAdmins: Admin[]) {
    let admins: Admin[] = [];
    for (let admin of jsonAdmins) {
      admins.push(Admin.fromJson(admin));
    }
    this.currentUserService.user?.setAdmins(admins);
    if (this.isAdminCategory()) {
      let currentAdmin = this.currentUserService.user?.admins?.
      find(admin => admin.getUserId() == this.currentUserService.user?.getUserId());
      if (currentAdmin !== undefined) {
        this.currentUserService.user?.admins?.splice(this.currentUserService.user?.admins?.indexOf(currentAdmin), 1)
      }
    }

    this.initializeUsersPfpImgUrl(this.currentUserService.user?.admins, this.adminService).then();
  }

  private initializeAllUsers() {
    this.customerService.getAllEntities().subscribe({
      next: (jsonCustomers: Customer[]) => {
        this.initializeCustomers(jsonCustomers);
      }
    });

    this.businessService.getAllEntities().subscribe({
      next: (jsonBusinesses: Business[]) => {
        this.initializeBusinesses(jsonBusinesses)
      }
    });

    this.deliveryServiceService.getAllEntities().subscribe({
      next: (jsonDeliveryServices: DeliveryService[]) => {
        this.initializeDeliveryServices(jsonDeliveryServices);
      }
    });

    this.deliveryPersonService.getAllEntities().subscribe({
      next: (jsonDeliveryPeople: DeliveryPerson[]) => {
        this.initializeDeliveryPeople(jsonDeliveryPeople);
      }
    });

    this.adminService.getAllEntities().subscribe({
      next: (jsonAdmins: Admin[]) => {
        this.initializeAdmins(jsonAdmins);
      }
    });
  }
}
