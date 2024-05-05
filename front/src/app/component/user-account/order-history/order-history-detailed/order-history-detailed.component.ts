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

  orderId: number | undefined;
  order: CustomerOrder | undefined;
  business: Business | undefined

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
      } else {
        this.orderId = id
        const userOrders = this.currentUserService.user?.customerOrders;
        if (userOrders){
          const verifUserOrder = userOrders.some(userOrder => userOrder.customerOrderId === this.orderId);
          if (verifUserOrder) {
            this.customerOrderService.findEntityById(this.orderId).subscribe({
              next: (customerOrder: CustomerOrder) => {
                this.order = customerOrder;
                this.fetchBusinessById(customerOrder.businessId)
              },
              error: (error: HttpErrorResponse) => {
                console.error('Error fetching order:', error);
                console.log("HTTP ERROR / NA : No order found");
              }
            });
          } else {
            this.router.navigate(['/user-account/order-history']);
          }
        } else {
          // Handle case where userOrders is undefined
          this.router.navigate(['/user-account/order-history']);
        }
      }
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
}
