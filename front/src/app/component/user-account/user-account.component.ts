import {Component, OnInit} from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faCamera, faUser} from "@fortawesome/free-solid-svg-icons";
import {FooterComponent} from "../footer/footer.component";
import {NgxResizeObserverModule} from "ngx-resize-observer";
import {CookieComponent} from "../misc/cookie-component";
import {UploadPfpComponent} from "./upload-pfp/upload-pfp.component";
import {TestModalComponent} from "../test-modal/test-modal.component";
import {CustomerService} from "../../service/user/customer.service";
import {BusinessService} from "../../service/user/business.service";
import {AdminService} from "../../service/user/admin.service";
import {DeliveryServiceService} from "../../service/user/delivery-service.service";
import {DeliveryPersonService} from "../../service/user/delivery-person.service";
import {CookieService} from "ngx-cookie-service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgIf} from "@angular/common";
import {CurrentUserService} from "../../service/user/current-user.service";

@Component({
  selector: 'app-user-account',
  standalone: true,
  imports: [
    FaIconComponent,
    FooterComponent,
    NgxResizeObserverModule,
    UploadPfpComponent,
    TestModalComponent,
    NgIf
  ],
  providers: [
    UploadPfpComponent,
    TestModalComponent
  ],
  templateUrl: './user-account.component.html',
  styleUrl: './user-account.component.scss'
})
export class UserAccountComponent extends CookieComponent implements OnInit {
  // Font Awesome Icons
  faUser = faUser;
  faCamera = faCamera;
  isHovering: boolean = false;


  constructor(protected override customerService: CustomerService,
              protected override businessService: BusinessService,
              protected override adminService: AdminService,
              protected override deliveryServiceService: DeliveryServiceService,
              protected override deliveryPersonService: DeliveryPersonService,
              protected override currentUserService: CurrentUserService,
              protected override cookieService: CookieService,
              protected override router: Router, protected override route: ActivatedRoute,
              private uploadPfpComponent: UploadPfpComponent) {
    super();
  }

  ngOnInit(): void {
    this.initializeUserByToken().then(() => {
      this.loggedInPage();
    });
  }

  openUploadPfpModal() {
    this.uploadPfpComponent.openModal();
  }
}
