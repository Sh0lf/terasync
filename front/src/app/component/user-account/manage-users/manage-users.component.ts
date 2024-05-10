import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {faPlus, faUserGroup} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {CookieComponent} from "../../misc/cookie-component";
import {CustomerService} from "../../../service/user/customer.service";
import {BusinessService} from "../../../service/user/business.service";
import {AdminService} from "../../../service/user/admin.service";
import {DeliveryServiceService} from "../../../service/user/delivery-service.service";
import {DeliveryPersonService} from "../../../service/user/delivery-person.service";
import {CurrentUserService} from "../../../service/user/current-user.service";
import {CookieService} from "ngx-cookie-service";
import {ActivatedRoute, Router} from "@angular/router";
import {
  adminCategory,
  businessCategory,
  customerCategory,
  deliveryPersonCategory,
  deliveryServiceCategory
} from "../../../service/user/userCategories";
import {AddressElementComponent} from "../user-settings/addresses/address-element/address-element.component";
import {NgForOf, NgIf} from "@angular/common";
import {UserElementComponent} from "./user-element/user-element.component";
import {
  ConnectionSecurityModalComponent
} from "../connection-security/connection-security-modal/connection-security-modal.component";
import {DeliveryPerson} from "../../../model/user/delivery.person";
import {User} from "../../../model/user/user";
import {UploadPfpModalComponent} from "../upload-pfp-modal/upload-pfp-modal.component";
import {EditingUserType} from "../../misc/editing-user-type";
import {RegisterModalComponent} from "../../authentication/register/register-modal/register-modal.component";
import {FormsModule} from "@angular/forms";
import {ManageUsersService} from "../../../service/misc/manage-users.service";
import {Subject} from "rxjs";
import {DeliveryService} from "../../../model/user/delivery.service";
import {Admin} from "../../../model/user/admin";
import {Customer} from "../../../model/user/customer";
import {Business} from "../../../model/user/business";
import {
  addressElement,
  emailElement,
  firstNameElement,
  lastNameElement,
  nameElement,
  phoneElement,
  usernameElement
} from "../../misc/editable-element";

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [
    FaIconComponent,
    AddressElementComponent,
    NgForOf,
    UserElementComponent,
    ConnectionSecurityModalComponent,
    UploadPfpModalComponent,
    RegisterModalComponent,
    NgIf,
    FormsModule
  ],
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.scss'
})
export class ManageUsersComponent extends CookieComponent implements OnInit {

  faUserGroup = faUserGroup;

  faPlus = faPlus;
  isConnectionSecurityModalOpen: boolean = false;
  isUploadPfpImgModalOpen: boolean = false;

  isRegisterUserModalOpen: boolean = false;
  editingUserSubject: Subject<User> = new Subject<User>();
  editingUser!: User;

  editingUserType: EditingUserType = EditingUserType.ADMIN;
  // WHEN ADMIN IS LOGGED IN, HE CAN FILTER THE DELIVERY PERSONS BY DELIVERY SERVICE IDK WHY I'M WRITING IN CAPITAL DON'T WORRY ABOUT IT

  selectedDeliveryServiceId!: number | undefined;

  constructor(private el: ElementRef,
              protected manageUsersService: ManageUsersService,
              protected override customerService: CustomerService,
              protected override businessService: BusinessService,
              protected override adminService: AdminService,
              protected override deliveryServiceService: DeliveryServiceService,
              protected override deliveryPersonService: DeliveryPersonService,
              protected override currentUserService: CurrentUserService,
              protected override cookieService: CookieService,
              protected override router: Router, protected override route: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.el.nativeElement.style.width = `100%`;

    if (this.manageUsersService.editingUserCategory === undefined) {
      this.routeToHome().then();
    } else {
      this.initializeUserByToken().then(() => {
        this.specificUserPage(adminCategory, deliveryServiceCategory).then();
        this.manageUsersService.fieldFilter = usernameElement.name;
        this.getSearchedUsers();
      });
    }
  }

  onConnectionSecurityModal(newVal: boolean) {
    this.isConnectionSecurityModalOpen = newVal;
  }

  onUploadPfpImgModal(newVal: boolean) {
    this.isUploadPfpImgModalOpen = newVal;
  }

  onRegisterUserModal(newVal: boolean) {
    this.isRegisterUserModalOpen = newVal;
  }

  onEditUser(user: User) {
    this.editingUser = user;
    this.editingUserSubject.next(user);
    this.onConnectionSecurityModal(true);
  }


  onEditUserImgPfp(user: User) {
    this.editingUser = user;
    this.editingUserSubject.next(user);
    this.onUploadPfpImgModal(true);
  }

  onDeleteUser(user: User) {
    this.manageUsersService.editingUserService?.deleteUserAndPfpImg(user).then(success => {
      if (success) {
        if (this.manageUsersService.editingUserCategory === deliveryPersonCategory) {
          this.currentUserService.user?.deliveryPeople?.splice(this.currentUserService.user?.deliveryPeople?.indexOf(user as DeliveryPerson), 1);
        } else if (this.manageUsersService.editingUserCategory === adminCategory) {
          this.currentUserService.user?.admins?.splice(this.currentUserService.user?.admins?.indexOf(user as Admin), 1);
        } else if (this.manageUsersService.editingUserCategory === deliveryServiceCategory) {
          this.currentUserService.user?.deliveryServices?.splice(this.currentUserService.user?.deliveryServices?.indexOf(user as DeliveryService), 1);
        } else if (this.manageUsersService.editingUserCategory === customerCategory) {
          this.currentUserService.user?.customers?.splice(this.currentUserService.user?.customers?.indexOf(user as Customer), 1);
        } else if (this.manageUsersService.editingUserCategory === businessCategory) {
          this.currentUserService.user?.businesses?.splice(this.currentUserService.user?.businesses?.indexOf(user as Business), 1);
        }
      }
    });
  }

  onUserAdded(user: User) {
    if (this.manageUsersService.editingUserCategory === deliveryPersonCategory) {
      this.currentUserService.user?.deliveryPeople?.push(user as DeliveryPerson);
    } else if (this.manageUsersService.editingUserCategory === adminCategory) {
      this.currentUserService.user?.admins?.push(user as Admin);
    } else if (this.manageUsersService.editingUserCategory === deliveryServiceCategory) {
      this.currentUserService.user?.deliveryServices?.push(user as DeliveryService);
    } else if (this.manageUsersService.editingUserCategory === customerCategory) {
      this.currentUserService.user?.customers?.push(user as Customer);
    } else if (this.manageUsersService.editingUserCategory === businessCategory) {
      this.currentUserService.user?.businesses?.push(user as Business);
    }
  }

  getSearchedUsers() {
    if (this.manageUsersService.editingUserCategory === deliveryPersonCategory) {
      return this.currentUserService.user?.deliveryPeople?.filter(user => {
        return this.checkFilter(user);
      }).map(user => user as User);
    } else if (this.manageUsersService.editingUserCategory === adminCategory) {
      return this.currentUserService.user?.admins?.filter(user => {
        return this.checkFilter(user);
      }).map(user => user as User);
    } else if (this.manageUsersService.editingUserCategory === deliveryServiceCategory) {
      return this.currentUserService.user?.deliveryServices?.filter(user => {
        return this.checkFilter(user);
      }).map(user => user as User);
    } else if (this.manageUsersService.editingUserCategory === customerCategory) {
      return this.currentUserService.user?.customers?.filter(user => {
        return this.checkFilter(user);
      }).map(user => user as User);
    } else if (this.manageUsersService.editingUserCategory === businessCategory) {
      return this.currentUserService.user?.businesses?.filter(user => {
        return this.checkFilter(user);
      }).map(user => user as User);
    }
    return [];
  }

  checkFilter(user: User) {
    if (this.manageUsersService.fieldFilter === usernameElement.name) {
      return user.username.toLowerCase().includes(this.manageUsersService.searchInput.toLowerCase()) &&
        this.isFilteringDeliveryService(user);
    } else if (this.manageUsersService.fieldFilter === emailElement.name) {
      return user.email.toLowerCase().includes(this.manageUsersService.searchInput.toLowerCase()) &&
        this.isFilteringDeliveryService(user);
    } else if (this.manageUsersService.fieldFilter === nameElement.name) {
      return user.getName()?.toLowerCase().includes(this.manageUsersService.searchInput.toLowerCase()) &&
        this.isFilteringDeliveryService(user);
    } else if (this.manageUsersService.fieldFilter === firstNameElement.name) {
      return user.firstName?.toLowerCase().includes(this.manageUsersService.searchInput.toLowerCase()) &&
        this.isFilteringDeliveryService(user);
    } else if (this.manageUsersService.fieldFilter === lastNameElement.name) {
      return user.lastName?.toLowerCase().includes(this.manageUsersService.searchInput.toLowerCase()) &&
        this.isFilteringDeliveryService(user);
    } else if (this.manageUsersService.fieldFilter === phoneElement.name) {
      return user.phone?.toLowerCase().includes(this.manageUsersService.searchInput.toLowerCase()) &&
        this.isFilteringDeliveryService(user);
    } else if (this.manageUsersService.fieldFilter === addressElement.name) {
      return user.address?.toLowerCase().includes(this.manageUsersService.searchInput.toLowerCase()) &&
        this.isFilteringDeliveryService(user);
    }
    return false;
  }

  isFilterByDs() {
    return this.isAdminCategory() && this.isEditingDeliveryPeople();
  }

  isFilteringDeliveryService(user: User) {
    return !this.isEditingDeliveryPeople() || (user.deliveryServiceId == this.selectedDeliveryServiceId) || this.selectedDeliveryServiceId == undefined;
  }

  isEditingDeliveryPeople() {
    return this.manageUsersService.editingUserCategory === deliveryPersonCategory && super.isAdminCategory();
  }

  clearFilters() {
    this.manageUsersService.fieldFilter = usernameElement.name;
    this.manageUsersService.searchInput = "";
    this.selectedDeliveryServiceId = undefined;
  }
}
