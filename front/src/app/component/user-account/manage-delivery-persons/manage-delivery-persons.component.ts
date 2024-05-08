import {Component, ElementRef, OnInit} from '@angular/core';
import {faBowlFood, faPlus, faUserAlt, faUserGroup} from "@fortawesome/free-solid-svg-icons";
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
  businessCategory,
  deliveryPersonCategory,
  deliveryServiceCategory,
  UserCategory
} from "../../../service/user/userCategories";
import {AddressElementComponent} from "../user-settings/addresses/address-element/address-element.component";
import {NgForOf} from "@angular/common";
import {DeliveryPersonElementComponent} from "./delivery-person-element/delivery-person-element.component";
import {
  ConnectionSecurityModalComponent
} from "../connection-security/connection-security-modal/connection-security-modal.component";
import {DeliveryPerson} from "../../../model/user/delivery.person";
import {User} from "../../../model/user/user";
import {UserService} from "../../../service/user/user.service";
import {UploadPfpModalComponent} from "../upload-pfp-modal/upload-pfp-modal.component";
import {EditingUserType} from "../../misc/editing-user-type";
import {RegisterModalComponent} from "../../authentication/register/register-modal/register-modal.component";
import {
  deliveryPersonRegistrationType,
  deliveryServiceRegistrationType
} from "../../authentication/register/registration-type";

@Component({
  selector: 'app-manage-delivery-persons',
  standalone: true,
  imports: [
    FaIconComponent,
    AddressElementComponent,
    NgForOf,
    DeliveryPersonElementComponent,
    ConnectionSecurityModalComponent,
    UploadPfpModalComponent,
    RegisterModalComponent
  ],
  templateUrl: './manage-delivery-persons.component.html',
  styleUrl: './manage-delivery-persons.component.scss'
})
export class ManageDeliveryPersonsComponent extends CookieComponent implements OnInit {

  faUserGroup = faUserGroup;
  faPlus = faPlus;

  isConnectionSecurityModalOpen: boolean = false;
  isUploadPfpImgModalOpen: boolean = false;
  isRegisterUserModalOpen: boolean = false;

  editingUser!: User;
  editingUserService: UserService<any>;
  editingUserCategory: UserCategory;

  editingUserType: EditingUserType = EditingUserType.ADMIN;
  deliveryPersonRegistrationType = deliveryPersonRegistrationType;

  constructor(private el: ElementRef,
              protected override customerService: CustomerService,
              protected override businessService: BusinessService,
              protected override adminService: AdminService,
              protected override deliveryServiceService: DeliveryServiceService,
              protected override deliveryPersonService: DeliveryPersonService,
              protected override currentUserService: CurrentUserService,
              protected override cookieService: CookieService,
              protected override router: Router, protected override route: ActivatedRoute) {
    super();

    this.editingUserService = deliveryPersonService;
    this.editingUserCategory = deliveryPersonCategory;
  }
  ngOnInit(): void {
    this.initializeUserByToken().then(() => {
      this.specificUserPage(deliveryServiceCategory).then();
    })

    this.el.nativeElement.style.width = `100%`;
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

  onEditDeliveryPerson(deliveryPerson: DeliveryPerson) {
    this.editingUser = deliveryPerson;
    this.onConnectionSecurityModal(true);
  }

  onEditImgPfp(deliveryPerson: DeliveryPerson) {
    this.editingUser = deliveryPerson;
    this.onUploadPfpImgModal(true);
  }

  onDeleteDeliveryPerson(deliveryPerson: DeliveryPerson) {
    this.deliveryPersonService.deleteUserAndPfpImg(deliveryPerson).then(success => {
      if (success) {
        this.currentUserService.user?.deliveryPeople?.
        splice(this.currentUserService.user?.deliveryPeople?.indexOf(deliveryPerson), 1);
      }
    });
  }

  onDeliveryPersonAdded(user: User) {
    this.currentUserService.user?.deliveryPeople?.push(user as DeliveryPerson);
  }
}
