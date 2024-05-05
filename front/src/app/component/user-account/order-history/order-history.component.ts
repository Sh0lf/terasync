import {Component, ElementRef, OnInit} from '@angular/core';
import {NgxResizeObserverModule} from "ngx-resize-observer";
import {NgForOf, NgIf} from "@angular/common";
import {OrderHistoryElementComponent} from "./order-history-element/order-history-element.component";
import {CookieService} from "ngx-cookie-service";
import {ActivatedRoute, Router, RouterOutlet} from "@angular/router";
import {CookieComponent} from "../../misc/cookie-component";
import {CustomerService} from "../../../service/user/customer.service";
import {BusinessService} from "../../../service/user/business.service";
import {AdminService} from "../../../service/user/admin.service";
import {DeliveryServiceService} from "../../../service/user/delivery-service.service";
import {DeliveryPersonService} from "../../../service/user/delivery-person.service";
import {CurrentUserService} from "../../../service/user/current-user.service";
import {CustomerOrderService} from "../../../service/odSystem/customer-order.service";
import {
  businessCategory,
  customerCategory,
  deliveryPersonCategory,
  deliveryServiceCategory
} from "../../../service/user/userCategories";
import {faCreditCard, faTableList} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [
    RouterOutlet,
    NgxResizeObserverModule,
    NgForOf,
    OrderHistoryElementComponent,
    NgIf,
    FaIconComponent
  ],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.scss'
})
export class OrderHistoryComponent extends CookieComponent implements OnInit {

  faTableList = faTableList;

  constructor(protected override customerService: CustomerService,
              protected override businessService: BusinessService,
              protected override adminService: AdminService,
              protected override deliveryServiceService: DeliveryServiceService,
              protected override deliveryPersonService: DeliveryPersonService,
              protected override cookieService: CookieService,
              protected override currentUserService: CurrentUserService,
              private el: ElementRef,
              private customerOrder: CustomerOrderService,
              protected override router: Router, protected override route: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.initializeUserByToken().then(() => {
      this.specificUserPage(customerCategory, deliveryPersonCategory, deliveryServiceCategory, businessCategory).then();
    });

    this.el.nativeElement.style.width = `100%`;
  }
}
