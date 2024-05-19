import {Component, ElementRef, OnInit} from '@angular/core';
import {faTableList} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {CookieComponent} from "../../misc/cookie-component";
import {CustomerService} from "../../../service/user/customer.service";
import {BusinessService} from "../../../service/user/business.service";
import {AdminService} from "../../../service/user/admin.service";
import {DeliveryServiceService} from "../../../service/user/delivery-service.service";
import {DeliveryPersonService} from "../../../service/user/delivery-person.service";
import {CurrentUserService} from "../../../service/user/current-user.service";
import {CookieService} from "ngx-cookie-service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {
  businessCategory,
  customerCategory,
  deliveryPersonCategory,
  deliveryServiceCategory
} from "../../../service/user/userCategories";
import {DeliveryService} from "../../../model/user/delivery.service";
import {Business} from "../../../model/user/business";
import {DeliveryPerson} from "../../../model/user/delivery.person";
import {CustomerOrderElementComponent} from "../message-center/customer-order-element/customer-order-element.component";
import {CustomerOrderElement} from "../message-center/customer-order-element/customer-order-element";
import {ManageOrderElementComponent} from "./manage-order-element/manage-order-element.component";
import {CustomerOrder} from "../../../model/odSystem/customer.order";

@Component({
  selector: 'app-manage-orders',
  standalone: true,
  imports: [
    FaIconComponent,
    FormsModule,
    NgForOf,
    CustomerOrderElementComponent,
    ManageOrderElementComponent,
    NgIf
  ],
  templateUrl: './manage-orders.component.html',
  styleUrl: './manage-orders.component.scss'
})
export class ManageOrdersComponent extends CookieComponent implements OnInit {

  faTableList = faTableList;
  selectedDeliveryServiceId!: number | undefined;
  selectedBusinessId!: number | undefined;
  selectedDeliveryPersonId!: number | undefined;

  deliveryServices: DeliveryService[] = [];
  deliveryPeople: DeliveryPerson[] = [];
  businesses: Business[] = [];

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
      this.specificUserPage(customerCategory, deliveryPersonCategory, deliveryServiceCategory, businessCategory).then();
      this.fetchCustomerOrdersParentEntities(this.getFilteredCustomerOrders()!).then((parentEntities) => {
        this.deliveryPeople = parentEntities.deliveryPeople;
        this.deliveryServices = parentEntities.deliveryServices;
        this.businesses = parentEntities.businesses;
      });
    });

    this.el.nativeElement.style.width = `100%`;
  }

  getFilteredCustomerOrders(): CustomerOrder[] {
    let customerOrders = this.currentUserService.user?.customerOrders?.filter(customerOrder => {
      return this.getAllowedStatuses(customerOrder) &&
        (this.selectedDeliveryPersonId == undefined || customerOrder.deliveryPerson?.getUserId() == this.selectedDeliveryPersonId) &&
        (this.selectedDeliveryServiceId == undefined || customerOrder.deliveryService?.getUserId() == this.selectedDeliveryServiceId) &&
        (this.selectedBusinessId == undefined || customerOrder.business?.getUserId() == this.selectedBusinessId);
    });

    if(customerOrders == undefined) {
      return [];
    } else {
      return customerOrders;
    }
  }

  getAllowedStatuses(customerOrder: CustomerOrder) {
    if(this.isCustomerCategory() || this.isBusinessCategory()) {
      return customerOrder.isPending() || customerOrder.isAccepted()
    } else if(this.isDeliveryServiceCategory()) {
      return customerOrder.isAccepted() || customerOrder.isDelivering()
    } else if(this.isDeliveryPersonCategory()) {
      return customerOrder.isDelivering()
    } else {
      return true;
    }
  }


  clearFilters() {
    this.selectedBusinessId = undefined;
    this.selectedDeliveryServiceId = undefined;
    this.selectedDeliveryPersonId = undefined;
  }
}
