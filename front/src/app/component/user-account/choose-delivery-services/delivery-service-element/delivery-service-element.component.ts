import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {faCamera, faPen, faTrash, faUser} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {NgIf} from "@angular/common";
import {User} from "../../../../model/user/user";
import {DeliveryServiceService} from "../../../../service/user/delivery-service.service";
import {CustomerService} from "../../../../service/user/customer.service";
import {DeliveryPersonService} from "../../../../service/user/delivery-person.service";
import {BusinessService} from "../../../../service/user/business.service";
import {AdminService} from "../../../../service/user/admin.service";
import {CurrentUserService} from "../../../../service/user/current-user.service";
import {Business} from "../../../../model/user/business";
import {DeliveryService} from "../../../../model/user/delivery.service";
import {CookieComponent} from "../../../misc/cookie-component";

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

  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  @Input() deliveryService: DeliveryService | undefined;

  constructor(protected override deliveryServiceService: DeliveryServiceService,
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
  }

}
