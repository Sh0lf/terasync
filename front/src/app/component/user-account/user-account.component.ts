import {AfterViewChecked, ChangeDetectorRef, Component, ComponentRef, OnInit} from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
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
import {ActivatedRoute, Router, RouterOutlet} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";
import {CurrentUserService} from "../../service/user/current-user.service";
import {ProfileMenuItemComponent} from "./profile-menu-item/profile-menu-item.component";
import {profileMenuItems} from "./profile-menu-item/profile-menu-item";
import {AddressesComponent} from "./user-settings/addresses/addresses.component";
import {ManageProductsComponent} from "./manage-products/manage-products.component";
import {UserSettingsComponent} from "./user-settings/user-settings.component";

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
    AddressesComponent,
    ManageProductsComponent,
    RouterOutlet,
    UserSettingsComponent
  ],
  providers: [
    UploadPfpModalComponent,
  ],
  templateUrl: './user-account.component.html',
  styleUrl: './user-account.component.scss'
})
export class UserAccountComponent extends CookieComponent implements OnInit, AfterViewChecked {
  profileMenuItems = profileMenuItems;

  constructor(private cdr: ChangeDetectorRef,
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
    this.initializeUserByToken().then(() => {
      this.loggedInPage();
    });
    if(this.router.url == '/user-account') {
      this.routeTo('/user-account/user-settings');
    }
  }

  ngAfterViewChecked(): void {
    profileMenuItems.forEach((profileMenuItem) => {
      if (profileMenuItem.link == this.router.url) {
        profileMenuItem.class = "profile-menu-item-clicked";
      } else {
        profileMenuItem.class = "profile-menu-item";
      }
    });
    this.cdr.detectChanges();
  }
}
