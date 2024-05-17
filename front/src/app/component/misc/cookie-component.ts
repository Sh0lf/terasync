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
import {CustomerOrderService} from "../../service/odSystem/customer-order.service";
import {CustomerOrder} from "../../model/odSystem/customer.order";
import {Status} from "../../model/odSystem/status";
import {ProductService} from "../../service/odSystem/product.service";
import {Product} from "../../model/odSystem/product";
import {ProductImageService} from "../../service/odSystem/product-image.service";
import {VariablesService} from "../../service/misc/variables.service";

export abstract class CookieComponent {
  // Services
  protected cookieService!: CookieService;

  protected customerService!: CustomerService;
  protected businessService!: BusinessService;
  protected adminService!: AdminService;
  protected deliveryServiceService!: DeliveryServiceService;
  protected deliveryPersonService!: DeliveryPersonService;
  protected currentUserService!: CurrentUserService;

  protected customerOrderService!: CustomerOrderService;
  protected productService!: ProductService;
  protected productImageService!: ProductImageService;

  protected router!: Router;
  protected route!: ActivatedRoute;

  protected variablesService!: VariablesService;

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
    return this.router.navigate(['/home'], {relativeTo: this.route});
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

  initializeBusinessesVariable() {
    this.variablesService.incrementCounter();
    return new Promise<boolean>((resolve, reject) => {
      if (this.variablesService.businesses != undefined && this.variablesService.businesses.length > 0) {
        resolve(true);
      } else if (this.variablesService.getCounter() == 1) {
        this.variablesService.setMainPromise(new Promise<boolean>((resolve_sub, reject) => {
          this.businessService.getAllEntities().subscribe({
            next: (businesses: Business[]) => {
              this.variablesService.setBusinesses(Business.initializeBusinesses({businesses: businesses}));
              resolve_sub(true);
              resolve(true);
            },
            error: (error: HttpErrorResponse) => {
              console.log("Error: " + error);
              resolve_sub(false);
              resolve(false);
            }
          });
        }));
      } else if (this.variablesService.getCounter() > 1) {
        this.variablesService.getMainPromise()?.then((success) => {
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
        if (users == undefined || users.length == 0) observer.next(count)

        for (let user of users!) {
          if (user != undefined && user.pfpImgPath! != undefined && user.pfpImgPath.length > 0) {
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
          if (count == users?.length || users == undefined) {
            resolve(true);
          }
        }
      });
    });
  }

  initializeProductImages(products: Product[]) {
    if (products != undefined && products.length! > 0) {
      products!.forEach((product: Product) => {
        product.productImages.forEach((productImage) => {
          this.productImageService.downloadFiles(productImage.path).subscribe({
            next: (httpEvent: HttpEvent<Blob>) => {
              if (httpEvent.type === HttpEventType.Response) {
                const file: File = new File([httpEvent.body!], httpEvent.headers.get('File-Name')!,
                  {type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`});

                productImage.imageUrl = URL.createObjectURL(file);
              }
            },
            error: (error: HttpErrorResponse) => {
              console.log("Error downloading file");
            }
          });
        });
      });
    }
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
      let currentAdmin = this.currentUserService.user?.admins?.find(admin => admin.getUserId() == this.currentUserService.user?.getUserId());
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

    this.initializeAllBusinesses();

    this.initializeAllDeliveryServices();

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

  initializeAllBusinesses() {
    this.businessService.getAllEntities().subscribe({
      next: (jsonBusinesses: Business[]) => {
        this.initializeBusinesses(jsonBusinesses)
      }
    });
  }

  initializeAllDeliveryServices() {
    this.deliveryServiceService.getAllEntities().subscribe({
      next: (jsonDeliveryServices: DeliveryService[]) => {
        this.initializeDeliveryServices(jsonDeliveryServices);
      }
    });
  }

  initializeAdminCustomerOrders(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      if (this.customerOrderService != undefined) {
        this.customerOrderService.getAllEntities().subscribe({
          next: (jsonCustomerOrders: CustomerOrder[]) => {
            this.currentUserService.user?.setCustomerOrders(
              CustomerOrder.initializeCustomerOrders({customerOrders: jsonCustomerOrders}));
            resolve(true);
          },
          error: (error: HttpErrorResponse) => {
            console.log("HTTP ERROR / NA : No customer orders found");
            resolve(false);
          }
        });
      }
    })
  }

  fetchCustomerOrdersParentEntities(customerOrders: CustomerOrder[]) {
    let businesses: Business[] = [];
    let deliveryPeople: DeliveryPerson[] = [];
    let deliveryServices: DeliveryService[] = [];
    let statuses: Status[] = [];

    return new Promise<{
      businesses: Business[],
      deliveryPeople: DeliveryPerson[],
      deliveryServices: DeliveryService[],
      statuses: Status[]
    }>((resolve, reject) => {
      if (customerOrders != undefined) {
        let count = 0;
        new Observable<number>((observer) => {
          for (let customerOrder of customerOrders) {
            this.businessService.findEntityById(customerOrder.businessId).subscribe({
              next: (jsonBusiness: Business) => {
                customerOrder.business = Business.fromJson(jsonBusiness);
                this.initBusinesses(businesses, customerOrder);
                observer.next(count++);
              },
              error: (error: HttpErrorResponse) => {
                console.log("HTTP ERROR / NA : No business found");
              }
            });
            this.customerService.findEntityById(customerOrder.customerId).subscribe({
              next: (jsonCustomer) => {
                customerOrder.customer = Customer.fromJson(jsonCustomer);
                observer.next(count++);
              },
              error: (error: HttpErrorResponse) => {
                console.log("HTTP ERROR / NA : No customer found");
              }
            });
            this.deliveryPersonService.findEntityById(customerOrder.deliveryPersonId).subscribe({
              next: (jsonDeliveryPerson) => {
                customerOrder.deliveryPerson = DeliveryPerson.fromJson(jsonDeliveryPerson);
                this.initDeliveryPeople(deliveryPeople, customerOrder);
                observer.next(count++);
              },
              error: (error: HttpErrorResponse) => {
                console.log("HTTP ERROR / NA : No delivery person found");
              }
            });
            this.deliveryServiceService.findEntityById(customerOrder.deliveryServiceId).subscribe({
              next: (jsonDeliveryService) => {
                customerOrder.deliveryService = DeliveryService.fromJson(jsonDeliveryService);
                this.initDeliveryServices(deliveryServices, customerOrder)
                observer.next(count++);
              },
              error: (error: HttpErrorResponse) => {
                console.log("HTTP ERROR / NA : No delivery service found");
              }
            });
            this.initStatuses(statuses, customerOrder);
          }
        }).subscribe({
          next: (count: number) => {
            if (count == (customerOrders.length * 4) - 1) {
              console.log("All parent entities fetched");

              resolve({
                businesses: businesses,
                deliveryPeople: deliveryPeople,
                deliveryServices: deliveryServices,
                statuses: statuses
              });
            }
          }
        });
      }
    });
  }

  private initBusinesses(businesses: Business[], businessContainer: { business: Business | undefined }) {
    if (!businesses.find(business => business.businessId == businessContainer.business?.businessId) ||
      businesses.length == 0) {
      businesses.push(businessContainer.business!);
    }
  }

  private initDeliveryPeople(deliveryPeople: DeliveryPerson[], order: CustomerOrder) {
    if (!deliveryPeople.find(deliveryPerson => deliveryPerson.deliveryPersonId == order.deliveryPerson?.deliveryPersonId) ||
      deliveryPeople.length == 0) {
      deliveryPeople.push(order.deliveryPerson!);
    }
  }

  private initDeliveryServices(deliveryServices: DeliveryService[], order: CustomerOrder) {
    if (!deliveryServices.find(deliveryService => deliveryService.deliveryServiceId == order.deliveryService?.deliveryServiceId) ||
      deliveryServices.length == 0) {
      deliveryServices.push(order.deliveryService!);
    }
  }

  private initStatuses(statuses: Status[], order: CustomerOrder) {
    if (!statuses.find(status => status.statusId == order.status!.statusId) ||
      statuses.length == 0) {
      statuses.push(order.status!);
    }
  }

  fetchMessageListParentEntities(customerOrders: CustomerOrder[]) {
    if (customerOrders != undefined) {
      for (let customerOrder of customerOrders) {
        if (customerOrder.messageLists != undefined) {
          for (let messageList of customerOrder.messageLists) {
            if (messageList.adminId > 0) {
              this.adminService.findEntityById(messageList.adminId).subscribe({
                next: (jsonAdmin) => {
                  messageList.messageUserOwner = User.fromJson(jsonAdmin);
                },
                error: (error: HttpErrorResponse) => {
                  console.log("HTTP ERROR / NA : No admin found");
                }
              });
            } else if (messageList.customerId > 0) {
              this.customerService.findEntityById(messageList.customerId).subscribe({
                next: (jsonCustomer) => {
                  messageList.messageUserOwner = User.fromJson(jsonCustomer);
                },
                error: (error: HttpErrorResponse) => {
                  console.log("HTTP ERROR / NA : No customer found");
                }
              });
            } else if (messageList.businessId > 0) {
              this.businessService.findEntityById(messageList.businessId).subscribe({
                next: (jsonBusiness) => {
                  messageList.messageUserOwner = User.fromJson(jsonBusiness);
                },
                error: (error: HttpErrorResponse) => {
                  console.log("HTTP ERROR / NA : No business found");
                }
              });
            } else if (messageList.deliveryPersonId > 0) {
              this.deliveryPersonService.findEntityById(messageList.deliveryPersonId).subscribe({
                next: (jsonDeliveryPerson) => {
                  messageList.messageUserOwner = User.fromJson(jsonDeliveryPerson);
                },
                error: (error: HttpErrorResponse) => {
                  console.log("HTTP ERROR / NA : No delivery person found");
                }
              });
            } else if (messageList.deliveryServiceId > 0) {
              this.deliveryServiceService.findEntityById(messageList.deliveryServiceId).subscribe({
                next: (jsonDeliveryService) => {
                  messageList.messageUserOwner = User.fromJson(jsonDeliveryService);
                },
                error: (error: HttpErrorResponse) => {
                  console.log("HTTP ERROR / NA : No delivery service found");
                }
              });
            }
          }
        }
      }
    }
  }

  initializeAdminProducts(): Promise<Business[]> {
    let businesses: Business[] = [];

    return new Promise<Business[]>((resolve, reject) => {
      this.productService.getAllEntities().subscribe({
        next: (jsonProducts) => {
          this.currentUserService.user?.setProducts(Product.initializeProducts({products: jsonProducts}));
          if (jsonProducts.length > 0) {
            let count = 0;
            new Observable<number>((observer) => {
              this.currentUserService.user?.products?.forEach((product: Product) => {
                this.businessService.findEntityById(product.businessId).subscribe({
                  next: (jsonBusiness: Business) => {
                    product.business = Business.fromJson(jsonBusiness);
                    this.initBusinesses(businesses, product);
                    observer.next(count++)
                  },
                  error: (error: HttpErrorResponse) => {
                    console.log("HTTP ERROR / NA : No business found");
                  }
                });
              });
            }).subscribe((count: number) => {
              if (count == this.currentUserService.user?.products?.length! - 1) {
                resolve(businesses);
              }
            });
          } else {
            resolve(businesses);
          }
        },
        error: (error: HttpErrorResponse) => {
          console.log("HTTP ERROR / NA : No products found");
          resolve(businesses);
        }
      });
    });
  }
}
