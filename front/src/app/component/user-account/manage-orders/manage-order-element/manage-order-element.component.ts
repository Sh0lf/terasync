import {Component, Input, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {CustomerOrder} from "../../../../model/odSystem/customer.order";
import {getDateTime} from "../../../misc/functions";
import {CookieComponent} from "../../../misc/cookie-component";
import {CookieService} from "ngx-cookie-service";
import {StatusService} from "../../../../service/odSystem/status.service";
import {Status, StatusEnum} from "../../../../model/odSystem/status";
import {CustomerOrderService} from "../../../../service/odSystem/customer-order.service";
import {StatusIdByCustomerOrderId} from "../../../../model/query/update/status-id-by-customer-order-id";
import {HttpErrorResponse} from "@angular/common/http";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faPen} from "@fortawesome/free-solid-svg-icons";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DeliveryPerson} from "../../../../model/user/delivery.person";
import {CurrentUserService} from "../../../../service/user/current-user.service";
import {Observable} from "rxjs";
import {
  DeliveryPersonIdByCustomerOrderId
} from "../../../../model/query/update/delivery-person-id-by-customer-order-id";
import {TempByCustomerOrderId} from "../../../../model/query/update/temp-by-customer-order-id";

@Component({
  selector: 'app-manage-order-element',
  standalone: true,
  imports: [
    NgIf,
    FaIconComponent,
    NgForOf,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './manage-order-element.component.html',
  styleUrl: './manage-order-element.component.scss'
})
export class ManageOrderElementComponent extends CookieComponent implements OnInit {

  selectedDeliveryPersonId!: number | undefined;

  @Input() customerOrder: CustomerOrder | undefined;

  creationTime: string = "";
  deliveryTime: string = "";
  minTemp!: number;
  maxTemp!: number;

  constructor(protected statusService: StatusService,
              protected override customerOrderService: CustomerOrderService,
              protected override currentUserService: CurrentUserService,
              protected override cookieService: CookieService) {
    super();
  }

  ngOnInit(): void {
    this.creationTime = getDateTime(this.customerOrder?.creationTime!);
    if (this.customerOrder?.hasDeliveryTime()) {
      this.deliveryTime = getDateTime(this.customerOrder?.deliveryTime!);
    }

    this.selectedDeliveryPersonId = this.customerOrder?.deliveryPerson!.getUserId();
    this.minTemp = this.customerOrder?.minTemp!;
    this.maxTemp = this.customerOrder?.maxTemp!;
  }

  getDenyButtonText() {
    if (this.isCustomerCategory() && this.customerOrder?.isPending()) {
      return "Cancel Order";
    } else if ((this.isBusinessCategory() && this.customerOrder?.isPending()) ||
      (this.isDeliveryServiceCategory() && this.customerOrder?.isAccepted())) {
      return "Reject Order";
    }

    return "";
  }

  getAcceptButtonText() {
    if (this.isDeliveryPersonCategory() && this.customerOrder?.isDelivering()) {
      return "Mark as Completed";
    } else if (this.isBusinessCategory() && this.customerOrder?.isPending()) {
      return "Accept Order";
    } else if (this.isDeliveryServiceCategory() && this.customerOrder?.isAccepted()) {
      return "Deliver Order";
    }

    return "";
  }

  onDenyButtonClick() {
    let newStatus = "";

    if (this.isCustomerCategory()) {
      newStatus = StatusEnum.CANCELLED;
    } else if (this.isBusinessCategory() || this.isDeliveryServiceCategory()) {
      newStatus = StatusEnum.REJECTED;
    }

    this.updatedStatus(newStatus);
  }

  onAcceptButtonClick() {
    let newStatus = "";

    if (this.isDeliveryPersonCategory()) {
      newStatus = StatusEnum.COMPLETED;
    } else if (this.isBusinessCategory()) {
      newStatus = StatusEnum.ACCEPTED;
    } else if (this.isDeliveryServiceCategory()) {
      newStatus = StatusEnum.DELIVERING;
    }

    this.updatedStatus(newStatus);
  }

  updatedStatus(newStatus: string) {
    this.statusService.findStatusByString(newStatus).subscribe({
      next: (jsonStatus: Status) => {
        let status: Status = Status.fromJson(jsonStatus);
        let statusIdByCustomerOrderId = new StatusIdByCustomerOrderId(this.customerOrder?.customerOrderId!, status.statusId!);

        this.customerOrderService.updateStatusIdByCustomerOrderId(statusIdByCustomerOrderId).subscribe({
          next: () => {
            this.customerOrder?.setStatusId(status.statusId!);
            this.customerOrder?.setStatus(status);
            console.log(`${this.customerOrder?.customerId} Status updated successfully to ${status.status}`);

            if(newStatus == StatusEnum.COMPLETED) {
              this.customerOrderService.updateDeliveryTimeByCustomerOrderId(this.customerOrder?.customerOrderId!).subscribe({
                next: (success: string) => {
                  if(success != "0") {
                    console.log(`${this.customerOrder?.customerOrderId} Delivery time updated successfully`);
                    this.customerOrder?.setDeliveryTime(success);
                  } else {
                    console.log(`Failed to update ${this.customerOrder?.customerOrderId} delivery time`);
                  }
                },
                error: (error: HttpErrorResponse) => console.log(error)
              });
            }
          },
          error: (error: HttpErrorResponse) => console.log(error)
        });
      }
    });

    if(this.canSelectDeliveryPerson()) this.updateDeliveryPerson();
    if(this.canChangeTemp()) this.updateMaxTemp();
  }

  hasText(text: string) {
    return text.length > 0;
  }

  canSelectDeliveryPerson() {
    return this.isDeliveryServiceCategory() && this.customerOrder?.isAccepted();
  }

  updateDeliveryPerson() {
    let deliveryPerson = this.currentUserService.user?.deliveryPeople!.find(deliveryPerson => deliveryPerson.getUserId() == this.selectedDeliveryPersonId);

    if(deliveryPerson != undefined && deliveryPerson != this.customerOrder?.deliveryPerson) {
      console.log(deliveryPerson)
      let deliveryPersonIdByCustomerOrderId =
        new DeliveryPersonIdByCustomerOrderId(deliveryPerson?.getUserId()!, this.customerOrder?.customerOrderId!);

      this.customerOrderService.updateDeliveryPersonIdByCustomerOrderId(deliveryPersonIdByCustomerOrderId).subscribe({
        next: (success: number) => {
          if(success) {
            this.customerOrder?.setDeliveryPerson(deliveryPerson!);
            console.log(`${this.customerOrder?.customerOrderId!} customer order updated delivery person id to ${deliveryPerson?.getUserId()}`);
          } else {
            console.log(`Failed to update ${this.customerOrder?.customerOrderId!} customer order delivery person id to ${deliveryPerson?.getUserId()}`);
          }
        },
        error: (error: HttpErrorResponse) => console.log(error)
      });
    }
  }

  canChangeTemp() {
    return this.isBusinessCategory() && this.customerOrder?.isPending();
  }

  private updateMaxTemp() {
    if(this.maxTemp == null) this.maxTemp = 0;
    if(this.maxTemp >= this.minTemp && this.maxTemp != this.customerOrder?.maxTemp) {
      let maxTempByCustomerOrderId = new TempByCustomerOrderId(this.customerOrder?.customerOrderId!, this.maxTemp);
      this.customerOrderService.updateMaxTempByCustomerOrderId(maxTempByCustomerOrderId).subscribe({
        next: (success: number) => {
          if(success) {
            this.customerOrder?.setMaxTemp(this.maxTemp);
            console.log(`${this.customerOrder?.customerOrderId!} customer order updated max temp to ${this.maxTemp}`);
            this.updateMinTemp();
          } else {
            console.log(`Failed to update ${this.customerOrder?.customerOrderId!} customer order max temp to ${this.maxTemp}`);
          }
        },
        error: (error: HttpErrorResponse) => console.log(error)
      });
    }
  }

  private updateMinTemp() {
    if(this.minTemp == null) this.minTemp = 0;
    if(this.minTemp <= this.maxTemp && this.minTemp != this.customerOrder?.minTemp) {
      let minTempByCustomerOrderId = new TempByCustomerOrderId(this.customerOrder?.customerOrderId!, this.minTemp);
      this.customerOrderService.updateMinTempByCustomerOrderId(minTempByCustomerOrderId).subscribe({
        next: (success: number) => {
          if(success) {
            this.customerOrder?.setMinTemp(this.minTemp);
            console.log(`${this.customerOrder?.customerOrderId!} customer order updated min temp to ${this.minTemp}`);
          } else {
            console.log(`Failed to update ${this.customerOrder?.customerOrderId!} customer order min temp to ${this.minTemp}`);
          }
        },
        error: (error: HttpErrorResponse) => console.log(error)
      });
    }
  }
}
