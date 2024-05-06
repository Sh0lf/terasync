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
import {HttpErrorResponse} from "@angular/common/http";
import {NgForOf} from "@angular/common";
import {
  OrderHistoryElementListComponent
} from "../order-history-element/order-history-element-list/order-history-element-list.component";
import {Business} from "../../../../model/user/business";

@Component({
  selector: 'app-order-history-detailed',
  standalone: true,
  imports: [RouterOutlet, NgForOf, OrderHistoryElementListComponent],
  templateUrl: './order-history-detailed.component.html',
  styleUrl: './order-history-detailed.component.scss'
})
export class OrderHistoryDetailedComponent extends CookieComponent implements OnInit {

  order: CustomerOrder | undefined;
  business: Business | undefined;
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
      let id= +params['id'];
      if (!id) {
        this.router.navigate(['/user-account/order-history']);
      }
      const userOrder = this.currentUserService.user?.customerOrders?.find(order => order.customerOrderId === id);
      if (!userOrder) {
        this.router.navigate(['/user-account/order-history']);
        return;
      }

      this.order = userOrder;
      this.fetchBusinessById(userOrder.businessId);
      this.transformTime(this.order.creationTime, this.order.deliveryTime);
    });
  }

  fetchBusinessById(id: number): void {
    this.businessService.findEntityById(id).subscribe({
      next: (business: Business) => {
        this.business = business;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching business:', error);
        console.log("HTTP ERROR / NA : No business found");
      }
    });
  }

  transformTime(timeCreation: String, timeDelivery: String): void {
    let splitted = timeCreation.split(" ")
    let date = splitted[0].split("-")
    let times=splitted[1].split(":")
    this.creationTime = date[0] + "/" + date[1] + "/" + date[2] + " at " + times[0] + ":" + times[1];

    splitted = timeDelivery.split(" ")
    date = splitted[0].split("-")
    times=splitted[1].split(":")
    this.deliveryTime = date[0] + "/" + date[1] + "/" + date[2] + " at " + times[0] + ":" + times[1];
  }
}
