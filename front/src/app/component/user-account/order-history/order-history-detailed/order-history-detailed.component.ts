import {Component, ElementRef, OnInit} from '@angular/core';
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
import {NgForOf, NgIf} from "@angular/common";
import {
  OrderHistoryElementListComponent
} from "../order-history-element/order-history-element-list/order-history-element-list.component";
import {composeDeliveryAddress, getDateTime} from "../../../misc/functions";
import {BasketService} from "../../../../service/misc/basket.service";

@Component({
  selector: 'app-order-history-detailed',
  standalone: true,
  imports: [RouterOutlet, NgForOf, OrderHistoryElementListComponent, NgIf],
  templateUrl: './order-history-detailed.component.html',
  styleUrl: './order-history-detailed.component.scss'
})
export class OrderHistoryDetailedComponent extends CookieComponent implements OnInit {

  customerOrder: CustomerOrder | undefined;
  creationTime: String | undefined;
  deliveryTime: String | undefined;
  total: number | undefined
  deliveryAddress: string | undefined;

  constructor(protected override customerService: CustomerService,
              protected basketService: BasketService,
              protected override businessService: BusinessService,
              protected override adminService: AdminService,
              protected override deliveryServiceService: DeliveryServiceService,
              protected override deliveryPersonService: DeliveryPersonService,
              protected override cookieService: CookieService,
              protected override currentUserService: CurrentUserService,
              protected override customerOrderService: CustomerOrderService,
              private el: ElementRef,
              protected override router: Router, protected override route: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    let id: string | undefined;

    this.route.params.subscribe(params => {
      id = params['id'];

      if (this.basketService.newCustomerOrder != undefined) {
        this.customerOrder = this.basketService.newCustomerOrder;
      } else if (id != undefined) {
        this.customerOrder = this.currentUserService.user?.customerOrders?.
        find(order => order.customerOrderId == parseInt(id!));
      } else {
        this.routeTo('/user-account/order-history');
        return;
      }
    });

    if(this.customerOrder != undefined) {
      this.calculateValues();
    }

    this.el.nativeElement.style.width = `100%`;
  }

  private calculateValues() {
    this.total = this.customerOrderService.getOrderTotal(this.customerOrder);
    this.creationTime = getDateTime(this.customerOrder?.creationTime!);
    if(this.customerOrder?.hasDeliveryTime()) this.deliveryTime = getDateTime(this.customerOrder?.deliveryTime!);
    this.deliveryAddress = composeDeliveryAddress(this.customerOrder?.address?.street,
      this.customerOrder?.address?.city, this.customerOrder?.address?.postalCode, this.customerOrder?.address?.country)
  }
}
