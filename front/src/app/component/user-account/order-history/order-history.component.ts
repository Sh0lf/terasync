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
import {usernameElement} from "../../misc/editable-element";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Status} from "../../../model/odSystem/status";
import {CustomerOrder} from "../../../model/odSystem/customer.order";

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [
    RouterOutlet,
    NgxResizeObserverModule,
    NgForOf,
    OrderHistoryElementComponent,
    NgIf,
    FaIconComponent,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.scss'
})
export class OrderHistoryComponent extends CookieComponent implements OnInit {
  faTableList = faTableList;

  statuses: Status[] = [];
  selectedStatusId: number | undefined;

  deliveryServices: DeliveryService[] = [];
  selectedDeliveryServiceId: number | undefined;

  deliveryPeople: DeliveryPerson[] = [];
  selectedDeliveryPersonId: number | undefined;

  businesses: Business[] = [];
  selectedBusinessId: number | undefined;

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
            this.initBusinesses(order);
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
            this.initDeliveryPeople(order);
          },
          error: (error: HttpErrorResponse) => {
            console.log("HTTP ERROR / NA : No delivery person found");
          }
        });
      }
      if(order.deliveryService == undefined) {
        this.deliveryServiceService.findEntityById(order.deliveryServiceId).subscribe({
          next: (jsonDeliveryService) => {
            order.deliveryService = DeliveryService.fromJson(jsonDeliveryService);
            this.initDeliveryServices(order)
          },
          error: (error: HttpErrorResponse) => {
            console.log("HTTP ERROR / NA : No delivery service found");
          }
        });
      }

      this.initStatuses(order);
    });

    if(this.statuses.length > 0) this.selectedStatusId = this.statuses.at(0)?.statusId;
    if(this.deliveryPeople.length > 0) this.selectedDeliveryPersonId = this.deliveryPeople.at(0)?.getUserId();
    if(this.deliveryServices.length > 0) this.selectedDeliveryServiceId = this.deliveryServices.at(0)?.getUserId();
    if(this.businesses.length > 0) this.selectedBusinessId = this.businesses.at(0)?.getUserId();
  }

  private initBusinesses(order: CustomerOrder) {
    if(!this.businesses.
    find(business => business.businessId == order.business?.businessId) ||
      this.businesses.length == 0) {
      this.businesses.push(order.business!);
    }
  }

  private initDeliveryPeople(order: CustomerOrder) {
    if(!this.deliveryPeople.
    find(deliveryPerson => deliveryPerson.deliveryPersonId == order.deliveryPerson?.deliveryPersonId) ||
      this.deliveryPeople.length == 0) {
      this.deliveryPeople.push(order.deliveryPerson!);
    }
  }

  private initDeliveryServices(order: CustomerOrder) {
    if(!this.deliveryServices.
    find(deliveryService => deliveryService.deliveryServiceId == order.deliveryService?.deliveryServiceId) ||
      this.deliveryServices.length == 0) {
      this.deliveryServices.push(order.deliveryService!);
    }
  }

  private initStatuses(order: CustomerOrder) {
    if(!this.statuses.
    find(status => status.statusId == order.status!.statusId) ||
      this.statuses.length == 0) {
      this.statuses.push(order.status!);
    }
  }

  getFilteredOrders() {
    return this.currentUserService.user?.customerOrders?.filter(order => {
      return (this.selectedStatusId == undefined || order.status?.statusId == this.selectedStatusId) &&
        (this.selectedDeliveryPersonId == undefined || order.deliveryPerson?.getUserId() == this.selectedDeliveryPersonId) &&
        (this.selectedDeliveryServiceId == undefined || order.deliveryService?.getUserId() == this.selectedDeliveryServiceId) &&
        (this.selectedBusinessId == undefined || order.business?.getUserId() == this.selectedBusinessId);
    });
  }

  clearFilters() {
    this.selectedStatusId = undefined;
    this.selectedDeliveryPersonId = undefined;
    this.selectedDeliveryServiceId = undefined;
    this.selectedBusinessId = undefined;
  }
}
