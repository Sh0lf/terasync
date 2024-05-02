import {Component, OnInit} from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faCamera, faPenToSquare, faUser} from "@fortawesome/free-solid-svg-icons";
import {FooterComponent} from "../footer/footer.component";
import {NgxResizeObserverModule} from "ngx-resize-observer";
import {CookieComponent} from "../misc/cookie-component";
import {UploadPfpModalComponent} from "./upload-pfp-modal/upload-pfp-modal.component";
import {CustomerService} from "../../service/user/customer.service";
import {BusinessService} from "../../service/user/business.service";
import {AdminService} from "../../service/user/admin.service";
import {DeliveryServiceService} from "../../service/user/delivery-service.service";
import {DeliveryPersonService} from "../../service/user/delivery-person.service";
import {CookieService} from "ngx-cookie-service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";
import {CurrentUserService} from "../../service/user/current-user.service";
import {ProfileMenuItemComponent} from "./profile-menu-item/profile-menu-item.component";
import {profileMenuItems} from "./profile-menu-item/profile-menu-item";
import {AddressesComponent} from "../addresses/addresses.component";
import {businessCategory, customerCategory} from "../../service/user/userCategories";

@Component({
  selector: 'app-user-account',
  standalone: true,
  imports: [
    FaIconComponent,
    FooterComponent,
    NgxResizeObserverModule,
    UploadPfpModalComponent,
    NgIf,
    ProfileMenuItemComponent,
    NgForOf,
    AddressesComponent
  ],
  providers: [
    UploadPfpModalComponent,
  ],
  templateUrl: './user-account.component.html',
  styleUrl: './user-account.component.scss'
})
export class UserAccountComponent extends CookieComponent implements OnInit {
  // Font Awesome Icons
  faUser = faUser;
  faCamera = faCamera;
  faPenToSquare = faPenToSquare;
  isModalOpen: boolean = false;
  hasAddresses: boolean = false;

  profileMenuItems = profileMenuItems;

  constructor(protected override customerService: CustomerService,
              protected override businessService: BusinessService,
              protected override adminService: AdminService,
              protected override deliveryServiceService: DeliveryServiceService,
              protected override deliveryPersonService: DeliveryPersonService,
              protected override currentUserService: CurrentUserService,
              protected override cookieService: CookieService,
              protected override router: Router, protected override route: ActivatedRoute,
              private uploadPfpComponent: UploadPfpModalComponent) {
    super();
  }

  ngOnInit(): void {
    this.initializeUserByToken().then(() => {
      this.loggedInPage();
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
