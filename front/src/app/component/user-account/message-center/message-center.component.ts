import {Component, ElementRef, OnInit} from '@angular/core';
import {faMessage} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
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
  customerCategory,
  deliveryPersonCategory,
  deliveryServiceCategory
} from "../../../service/user/userCategories";
import {CookieComponent} from "../../misc/cookie-component";

@Component({
  selector: 'app-message-center',
  standalone: true,
  imports: [
    FaIconComponent
  ],
  templateUrl: './message-center.component.html',
  styleUrl: './message-center.component.scss'
})
export class MessageCenterComponent extends CookieComponent implements OnInit {

  protected readonly faMessage = faMessage;

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
    this.initializeUserByToken().then(() => {
      this.specificUserPage(customerCategory, adminCategory, deliveryPersonCategory)
    })

    this.el.nativeElement.style.width = `100%`;
  }
}
