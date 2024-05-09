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
import {faTableList} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {Business} from "../../../model/user/business";
import {HttpErrorResponse} from "@angular/common/http";
import {Customer} from "../../../model/user/customer";
import {DeliveryPerson} from "../../../model/user/delivery.person";
import {DeliveryService} from "../../../model/user/delivery.service";

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
      this.fetchParentUsers();
    });

    this.el.nativeElement.style.width = `100%`;
  }

  private fetchParentUsers() {
    this.currentUserService.user?.customerOrders?.forEach(order => {
      if(order.business === undefined) {
        this.businessService.findEntityById(order.businessId).subscribe({
          next: (jsonBusiness: Business) => {
            order.business = Business.fromJson(jsonBusiness);
          },
          error: (error: HttpErrorResponse) => {
            console.log("HTTP ERROR / NA : No business found");
          }
        });
      }

      if(order.customer === undefined) {
        this.customerService.findEntityById(order.customerId).subscribe({
          next: (jsonCustomer) => {
            order.customer = Customer.fromJson(jsonCustomer);
          },
          error: (error: HttpErrorResponse) => {
            console.log("HTTP ERROR / NA : No customer found");
          }
        });
      }

      if(order.deliveryPerson == undefined) {
        this.deliveryPersonService.findEntityById(order.deliveryPersonId).subscribe({
          next: (jsonDeliveryPerson) => {
            order.deliveryPerson = DeliveryPerson.fromJson(jsonDeliveryPerson);
          },
          error: (error: HttpErrorResponse) => {
            console.log("HTTP ERROR / NA : No delivery person found");
          }
        });

        if(order.deliveryService == undefined) {
          this.deliveryServiceService.findEntityById(order.deliveryServiceId).subscribe({
            next: (jsonDeliveryService) => {
              order.deliveryService = DeliveryService.fromJson(jsonDeliveryService);
            },
            error: (error: HttpErrorResponse) => {
              console.log("HTTP ERROR / NA : No delivery service found");
            }
          });
        }
      }
    });
  }
}
