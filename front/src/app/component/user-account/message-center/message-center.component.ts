import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {faMessage} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {CustomerService} from "../../../service/user/customer.service";
import {BusinessService} from "../../../service/user/business.service";
import {AdminService} from "../../../service/user/admin.service";
import {DeliveryServiceService} from "../../../service/user/delivery-service.service";
import {DeliveryPersonService} from "../../../service/user/delivery-person.service";
import {CurrentUserService} from "../../../service/user/current-user.service";
import {CookieService} from "ngx-cookie-service";
import {ActivatedRoute, Router} from "@angular/router";
import {
  adminCategory, businessCategory,
  customerCategory,
  deliveryPersonCategory,
  deliveryServiceCategory, UserCategory
} from "../../../service/user/userCategories";
import {CookieComponent} from "../../misc/cookie-component";
import {NgForOf, NgIf} from "@angular/common";
import {CustomerOrderElementComponent} from "./customer-order-element/customer-order-element.component";
import {CustomerOrderService} from "../../../service/odSystem/customer-order.service";
import {CustomerOrderElement} from "./customer-order-element/customer-order-element";
import {MessageList} from "../../../model/message.list";
import {MessageListElementComponent} from "./message-list-element/message-list-element.component";
import {MessageListElement} from "./message-list-element/message-list-element";
import {FormsModule} from "@angular/forms";
import {MessageListService} from "../../../service/message-list.service";
import {Status, StatusEnum} from "../../../model/odSystem/status";
import {DeliveryService} from "../../../model/user/delivery.service";
import {DeliveryPerson} from "../../../model/user/delivery.person";
import {Business} from "../../../model/user/business";

@Component({
  selector: 'app-message-center',
  standalone: true,
  imports: [
    FaIconComponent,
    NgForOf,
    CustomerOrderElementComponent,
    MessageListElementComponent,
    FormsModule,
    NgIf
  ],
  templateUrl: './message-center.component.html',
  styleUrl: './message-center.component.scss'
})
export class MessageCenterComponent extends CookieComponent implements OnInit {
  faMessage = faMessage;
  customerOrderElements: CustomerOrderElement[] = [];
  messageListElements: MessageListElement[] = [];
  messageTyped: string = "";
  selectedCustomerOrderElement: CustomerOrderElement | undefined;

  statuses: Status[] = [];
  selectedStatusId: number | undefined;

  deliveryServices: DeliveryService[] = [];
  selectedDeliveryServiceId: number | undefined;

  deliveryPeople: DeliveryPerson[] = [];
  selectedDeliveryPersonId: number | undefined;

  businesses: Business[] = [];
  selectedBusinessId: number | undefined;

  @ViewChild('messageAreaDiv') messageAreaDiv!: ElementRef;

  constructor(private el: ElementRef,
              private messageListService: MessageListService,
              protected override customerService: CustomerService,
              protected override businessService: BusinessService,
              protected override adminService: AdminService,
              protected override deliveryServiceService: DeliveryServiceService,
              protected override deliveryPersonService: DeliveryPersonService,
              protected override currentUserService: CurrentUserService,
              protected override customerOrderService: CustomerOrderService,
              protected override cookieService: CookieService,
              protected override router: Router, protected override route: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.initializeUserByToken().then(() => {
      if(this.isAdminCategory()) {
        this.initializeAdminCustomerOrders().then(success => {
          if(success) {
            this.fetchCustomerOrdersInfo();

          }
        });
      } else {
        this.fetchCustomerOrdersInfo();
      }
    })

    this.el.nativeElement.style.width = `100%`;
  }

  private fetchCustomerOrdersInfo() {
    this.fetchCustomerOrdersParentEntities(this.currentUserService.user?.customerOrders!).then((parentEntities) => {
      this.statuses = parentEntities.statuses;
      this.deliveryPeople = parentEntities.deliveryPeople;
      this.deliveryServices = parentEntities.deliveryServices;
      this.businesses = parentEntities.businesses;
    });

    this.fetchMessageListParentEntities(this.currentUserService.user?.customerOrders!);
    if(this.currentUserService.user?.customerOrders != undefined) {
      for (let customerOrder of this.currentUserService.user?.customerOrders!) {
        this.customerOrderElements.push(new CustomerOrderElement(customerOrder));
      }
      this.onCustomerOrderElementClick(this.customerOrderElements[0]);
    }
  }

  onCustomerOrderElementClick(customerOrderElement: CustomerOrderElement) {
    for (let customerOrderElement of this.customerOrderElements) {
      customerOrderElement.setUnclicked();
    }

    customerOrderElement.setClicked();
    this.selectedCustomerOrderElement = customerOrderElement;

    this.messageListElements = [];
    if(customerOrderElement.customerOrder?.messageLists != undefined) {
      for (let messageList of customerOrderElement.customerOrder?.messageLists!) {
        this.messageListElements.push(new MessageListElement(messageList, this.currentUserService.user?.getUserId()!, this.getCurrentUserCategory()));
      }
    }

    this.scrollToBottom();
  }

  onMessageEnter() {
    if(this.messageTyped.length > 0) {
      let messageList = new MessageList(this.messageTyped,
        this.selectedCustomerOrderElement?.customerOrder?.customerOrderId!,
        this.getUserSenderId(adminCategory),
        this.getUserSenderId(customerCategory),
        this.getUserSenderId(deliveryPersonCategory),
        this.getUserSenderId(deliveryServiceCategory),
        this.getUserSenderId(businessCategory))

      this.messageListService.addEntity(messageList).subscribe({
        next: (messageList) => {
          this.updateMessageLists(MessageList.fromJson(messageList));

          this.messageTyped = "";
        },
        error: (error) => {
          console.log(error);
        }

      })
    }
  }

  private getUserSenderId(userCategory: UserCategory) {
    if(userCategory.name == this.getCurrentUserCategory().name) {
      return this.currentUserService.user?.getUserId()!;
    } else if(userCategory.name == this.getCurrentUserCategory().name) {
      return this.currentUserService.user?.getUserId()!;
    } else if(userCategory.name == this.getCurrentUserCategory().name) {
      return this.currentUserService.user?.getUserId()!;
    } else if(userCategory.name == this.getCurrentUserCategory().name) {
      return this.currentUserService.user?.getUserId()!;
    } else if(userCategory.name == this.getCurrentUserCategory().name) {
      return this.currentUserService.user?.getUserId()!;
    } else {
      return 0;
    }
  }

  private updateMessageLists(messageList: MessageList) {
    messageList.messageUserOwner = this.currentUserService.user;
    this.selectedCustomerOrderElement?.customerOrder?.messageLists?.push(messageList);
    this.messageListElements.push(new MessageListElement(messageList, this.currentUserService.user?.getUserId()!, this.getCurrentUserCategory()));

    this.scrollToBottom();

  }

  private scrollToBottom() {
    setTimeout(() => {
      let messageAreaDivEl = this.messageAreaDiv.nativeElement;
      messageAreaDivEl.scrollTop = Math.max(0, messageAreaDivEl.scrollHeight - messageAreaDivEl.offsetHeight);
    }, 5);
  }

  isPending() {
    let status = this.selectedCustomerOrderElement?.customerOrder?.status?.status;
    return status == StatusEnum.PENDING || status == StatusEnum.ACCEPTED || status == StatusEnum.DELIVERING;
  }

  getFilteredCustomerOrderElements() {
    let filteredCustomerOrderElements: CustomerOrderElement[] = [];

    filteredCustomerOrderElements = this.customerOrderElements.filter(customerOrderElement => {
      return (this.selectedStatusId == undefined || customerOrderElement.customerOrder?.status?.statusId == this.selectedStatusId) &&
        (this.selectedDeliveryPersonId == undefined || customerOrderElement.customerOrder?.deliveryPerson?.getUserId() == this.selectedDeliveryPersonId) &&
        (this.selectedDeliveryServiceId == undefined || customerOrderElement.customerOrder?.deliveryService?.getUserId() == this.selectedDeliveryServiceId) &&
        (this.selectedBusinessId == undefined || customerOrderElement.customerOrder?.business?.getUserId() == this.selectedBusinessId);
    });



    return filteredCustomerOrderElements;
  }

  clearFilters() {
    this.selectedStatusId = undefined;
    this.selectedDeliveryPersonId = undefined;
    this.selectedDeliveryServiceId = undefined;
    this.selectedBusinessId = undefined;
  }
}
