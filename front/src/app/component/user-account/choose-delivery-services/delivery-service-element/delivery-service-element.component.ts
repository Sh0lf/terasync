import {Component, Input, OnInit} from '@angular/core';
import {faTrash, faUser} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {NgIf} from "@angular/common";
import {DeliveryServiceService} from "../../../../service/user/delivery-service.service";
import {CustomerService} from "../../../../service/user/customer.service";
import {DeliveryPersonService} from "../../../../service/user/delivery-person.service";
import {BusinessService} from "../../../../service/user/business.service";
import {AdminService} from "../../../../service/user/admin.service";
import {CurrentUserService} from "../../../../service/user/current-user.service";
import {DeliveryService} from "../../../../model/user/delivery.service";
import {CookieComponent} from "../../../misc/cookie-component";
import {DeliveryServiceList} from "../../../../model/odSystem/delivery.service.list";
import {DeliveryServiceListService} from "../../../../service/odSystem/delivery-service-list.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-delivery-service-element',
  standalone: true,
  imports: [
    FaIconComponent,
    NgIf
  ],
  templateUrl: './delivery-service-element.component.html',
  styleUrl: './delivery-service-element.component.scss'
})
export class DeliveryServiceElementComponent extends CookieComponent implements OnInit {
  faUser = faUser;
  faTrash = faTrash;

  memberSince: string = "";

  private readonly allowButtonClass: string = "allow-button";
  private readonly denyButtonClass: string = "deny-button";
  private readonly allowButtonText: string = "Allow";
  private readonly denyButtonText: string = "Deny";

  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  @Input() deliveryService: DeliveryService | undefined;
  deliveryServiceList: DeliveryServiceList | undefined;

  constructor(protected override deliveryServiceService: DeliveryServiceService,
              private deliveryServiceListService: DeliveryServiceListService,
              protected override customerService: CustomerService,
              protected override deliveryPersonService: DeliveryPersonService,
              protected override businessService: BusinessService,
              protected override adminService: AdminService,
              protected override currentUserService: CurrentUserService) {
    super();
  }

  ngOnInit(): void {
    let date: Date = new Date(this.deliveryService?.registrationDate!)
    this.memberSince = date.toLocaleDateString(undefined, this.options);
    this.initButton();
  }

  private initButton() {
    this.deliveryServiceList = this.currentUserService.user?.deliveryServiceLists?.find((deliveryServiceList) =>
      deliveryServiceList.deliveryServiceId === this.deliveryService?.deliveryServiceId);
  }

  onButtonClick() {
    if(this.deliveryServiceList != undefined) {
      this.deliveryServiceListService.deleteEntity(this.deliveryServiceList?.deliveryServiceListId!).subscribe({
        next: () => {
          console.log("Delivery service list deleted with id: " + this.deliveryServiceList?.deliveryServiceListId);
          this.currentUserService.user?.deliveryServiceLists?.splice(this.currentUserService.user?.
          deliveryServiceLists?.indexOf(this.deliveryServiceList!), 1);
          this.deliveryServiceList = undefined;
        },
        error: (error: HttpErrorResponse) => {
          console.log(error)
        }
      });
    } else {
      let newDeliveryServiceList: DeliveryServiceList =
        new DeliveryServiceList(this.deliveryService?.deliveryServiceId!, this.currentUserService.user?.businessId!);

      this.deliveryServiceListService.addEntity(newDeliveryServiceList).subscribe({
        next: (jsonDeliveryServiceList) => {
          this.deliveryServiceList = DeliveryServiceList.fromJson(jsonDeliveryServiceList);
          this.currentUserService.user?.deliveryServiceLists?.push(this.deliveryServiceList!);

          console.log("Delivery service list added with id: " + jsonDeliveryServiceList.deliveryServiceListId)
        },
        error: (error: HttpErrorResponse) => {
          console.log(error)
        }
      });
    }
  }

  getButtonClass() {
    if (this.deliveryServiceList != undefined) {
      return this.denyButtonClass;
    } else {
      return this.allowButtonClass;
    }
  }

  getButtonText() {
    if (this.deliveryServiceList != undefined) {
      return this.denyButtonText;
    } else {
      return this.allowButtonText;
    }
  }
}
