import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CookieComponent} from "../../../misc/cookie-component";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faCamera, faPen, faTrash, faUser} from "@fortawesome/free-solid-svg-icons";
import {CurrentUserService} from "../../../../service/user/current-user.service";
import {DeliveryPersonService} from "../../../../service/user/delivery-person.service";
import {DeliveryServiceService} from "../../../../service/user/delivery-service.service";
import {NgIf} from "@angular/common";
import {User} from "../../../../model/user/user";
import {CustomerService} from "../../../../service/user/customer.service";
import {BusinessService} from "../../../../service/user/business.service";
import {AdminService} from "../../../../service/user/admin.service";
import {Customer} from "../../../../model/user/customer";
import {Business} from "../../../../model/user/business";
import {DeliveryService} from "../../../../model/user/delivery.service";

@Component({
  selector: 'app-user-element',
  standalone: true,
  imports: [
    FaIconComponent,
    NgIf
  ],
  templateUrl: './user-element.component.html',
  styleUrl: './user-element.component.scss'
})
export class UserElementComponent extends CookieComponent implements OnInit {
  faUser = faUser;
  faPen = faPen;
  faCamera = faCamera;
  faTrash = faTrash;

  memberSince: string = "";

  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  @Input() user: User | undefined;
  @Output() onEditUserEmitter = new EventEmitter<User>();
  @Output() onDeleteUserEmitter = new EventEmitter<User>();
  @Output() onEditImgPfpEmitter = new EventEmitter<User>();
  @Output() onEditApprovementEmitter = new EventEmitter<User>();

  constructor(protected override deliveryServiceService: DeliveryServiceService,
              protected override customerService: CustomerService,
              protected override deliveryPersonService: DeliveryPersonService,
              protected override businessService: BusinessService,
              protected override adminService: AdminService,
              protected override currentUserService: CurrentUserService) {
    super();
  }

  ngOnInit(): void {
    let date: Date = new Date(this.user?.registrationDate!)
    this.memberSince = date.toLocaleDateString(undefined, this.options);
  }

  onEditUser() {
    this.onEditUserEmitter.emit(this.user);
  }

  onEditImgPfp() {
    this.onEditImgPfpEmitter.emit(this.user);
  }

  onDeleteUser() {
    this.onDeleteUserEmitter.emit(this.user);
  }

  onEditApprovementUser() {
    this.onEditApprovementEmitter.emit(this.user);
  }

  isApprovableUser() {
    return this.user instanceof Business || this.user instanceof DeliveryService;
  }
}
