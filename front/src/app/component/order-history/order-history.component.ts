import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {FooterComponent} from "../footer/footer.component";
import {NgxResizeObserverModule} from "ngx-resize-observer";
import {NgForOf} from "@angular/common";
import {OrderHistoryElementComponent} from "./order-history-element/order-history-element.component";
import {CustomerService} from "../../service/user/customer.service";
import {BusinessService} from "../../service/user/business.service";
import {AdminService} from "../../service/user/admin.service";
import {DeliveryServiceService} from "../../service/user/delivery-service.service";
import {DeliveryPersonService} from "../../service/user/delivery-person.service";
import {CookieService} from "ngx-cookie-service";
import {CurrentUserService} from "../../service/user/current-user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CustomerOrderService} from "../../service/odSystem/customer-order.service";
import { Observable} from "rxjs";
import {CustomerOrder} from "../../model/odSystem/customer.order";


@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    NgxResizeObserverModule,
    NgForOf,
    OrderHistoryElementComponent
  ],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.scss'
})
export class OrderHistoryComponent implements OnInit {

  constructor(protected customerService: CustomerService,
              protected businessService: BusinessService,
              protected adminService: AdminService,
              protected deliveryServiceService: DeliveryServiceService,
              protected deliveryPersonService: DeliveryPersonService,
              protected cookieService: CookieService,
              protected currentUserService: CurrentUserService,
              private customerOrder: CustomerOrderService,
              protected router: Router, protected route: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.getOrdersFromUser()
  }

}
