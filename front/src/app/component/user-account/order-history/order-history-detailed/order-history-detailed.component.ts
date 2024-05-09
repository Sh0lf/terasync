import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterOutlet} from "@angular/router";
import {CookieComponent} from "../../../misc/cookie-component";
import {CustomerService} from "../../../../service/user/customer.service";
import {BusinessService} from "../../../../service/user/business.service";
import {AdminService} from "../../../../service/user/admin.service";
import {DeliveryServiceService} from "../../../../service/user/delivery-service.service";
import {DeliveryPersonService} from "../../../../service/user/delivery-person.service";
import {CookieService} from "ngx-cookie-service";
import {CurrentUserService} from "../../../../service/user/current-user.service";
import {CustomerOrderService} from "../../../../service/odSystem/customer-order.service";
import {CustomerOrder} from "../../../../model/odSystem/customer.order";
import {NgForOf} from "@angular/common";
import {
  OrderHistoryElementListComponent
} from "../order-history-element/order-history-element-list/order-history-element-list.component";
import {getDateTime} from "../../../misc/functions";

@Component({
  selector: 'app-order-history-detailed',
  standalone: true,
  imports: [RouterOutlet, NgForOf, OrderHistoryElementListComponent],
  templateUrl: './order-history-detailed.component.html',
  styleUrl: './order-history-detailed.component.scss'
})
export class OrderHistoryDetailedComponent extends CookieComponent implements OnInit {

  customerOrder: CustomerOrder | undefined;
  creationTime: String | undefined;
  deliveryTime: String | undefined;

  constructor(
    protected override customerService: CustomerService,
    protected override businessService: BusinessService,
    protected override adminService: AdminService,
    protected override deliveryServiceService: DeliveryServiceService,
    protected override deliveryPersonService: DeliveryPersonService,
    protected override cookieService: CookieService,
    protected override currentUserService: CurrentUserService,
    protected customerOrderService: CustomerOrderService,
    protected override router: Router, protected override route: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let id = params['id'];
      const userOrder = this.currentUserService.user?.customerOrders?.
      find(order => order.customerOrderId == id);

      if (!userOrder) {
        this.router.navigate(['/user-account/order-history']).then();
        return;
      }

      this.customerOrder = userOrder;
      this.creationTime = getDateTime(this.customerOrder.creationTime);
      this.deliveryTime = getDateTime(this.customerOrder.deliveryTime);
    });
  }
}
