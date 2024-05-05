import {Component, ElementRef, OnInit} from '@angular/core';
import {faCamera, faPenToSquare, faUser} from "@fortawesome/free-solid-svg-icons";
import {UploadPfpModalComponent} from "../upload-pfp-modal/upload-pfp-modal.component";
import {CustomerService} from "../../../service/user/customer.service";
import {BusinessService} from "../../../service/user/business.service";
import {AdminService} from "../../../service/user/admin.service";
import {DeliveryServiceService} from "../../../service/user/delivery-service.service";
import {DeliveryPersonService} from "../../../service/user/delivery-person.service";
import {CurrentUserService} from "../../../service/user/current-user.service";
import {CookieService} from "ngx-cookie-service";
import {ActivatedRoute, Router} from "@angular/router";
import {CookieComponent} from "../../misc/cookie-component";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {NgIf} from "@angular/common";
import {AddressesComponent} from "./addresses/addresses.component";
import {customerCategory} from "../../../service/user/userCategories";
import {User} from "../../../model/user/user";
import {UserService} from "../../../service/user/user.service";

@Component({
  selector: 'app-user-settings',
  standalone: true,
  imports: [
    UploadPfpModalComponent,
    FaIconComponent,
    NgIf,
    AddressesComponent
  ],
  templateUrl: './user-settings.component.html',
  styleUrl: './user-settings.component.scss'
})
export class UserSettingsComponent extends CookieComponent implements OnInit {

  hasAddresses: boolean = false;
  isModalOpen: boolean = false;

  user!: User;
  userService!: UserService<any>

  faUser = faUser;
  faCamera = faCamera;
  faPenToSquare = faPenToSquare;

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
  }

  ngOnInit(): void {
    this.el.nativeElement.style.width = `100%`;

    this.initializeUserByToken().then(() => {
      this.loggedInPage();

      this.user = this.currentUserService.user!;
      this.userService = this.fetchUserService();
    });

    this.hasAddresses = this.includesCurrentCategory(customerCategory);
  }

  openModal() {
    this.isModalOpen = true;
  }

  onChangeEmitter(newVal: boolean) {
    this.isModalOpen = newVal;
  }
}
