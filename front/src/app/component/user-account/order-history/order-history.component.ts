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
import {OrderHistoryRatingModalComponent} from "./order-history-rating-modal/order-history-rating-modal.component";

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
        FormsModule,
        OrderHistoryRatingModalComponent
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

  isRatingModalOpen: boolean = false;
  ratingCustomerOrder: CustomerOrder | undefined;

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
      this.fetchCustomerOrdersParentEntities(this.currentUserService.user?.customerOrders!).then((parentEntities) => {
        this.statuses = parentEntities.statuses;
        this.deliveryPeople = parentEntities.deliveryPeople;
        this.deliveryServices = parentEntities.deliveryServices;
        this.businesses = parentEntities.businesses;
      });
    });

    this.el.nativeElement.style.width = `100%`;
  }

  getFilteredCustomerOrders() {
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

  closeModal(newVal: boolean) {
    this.isRatingModalOpen = newVal;
  }

  onRateOrder(ratingCustomerOrder: CustomerOrder) {
    this.ratingCustomerOrder = ratingCustomerOrder;
    this.isRatingModalOpen = true;
  }
}
