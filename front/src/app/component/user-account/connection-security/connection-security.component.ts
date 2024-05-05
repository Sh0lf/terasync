import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {
  addressElement,
  EditableElement,
  editableElements,
  emailElement,
  firstNameElement,
  lastNameElement,
  nameElement,
  passwordElement,
  phoneElement,
  usernameElement
} from "./connection-security-field/editable-element";
import {NgForOf, NgIf} from "@angular/common";
import {CsElemComponent} from "./connection-security-field/cs-elem.component";
import {FooterComponent} from "../../footer/footer.component";
import {CookieService} from "ngx-cookie-service";
import {CurrentUserService} from "../../../service/user/current-user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../../model/user/user";
import {CustomerService} from "../../../service/user/customer.service";
import {BusinessService} from "../../../service/user/business.service";
import {AdminService} from "../../../service/user/admin.service";
import {DeliveryServiceService} from "../../../service/user/delivery-service.service";
import {DeliveryPersonService} from "../../../service/user/delivery-person.service";
import {NgxResizeObserverModule} from "ngx-resize-observer";
import {FormComponent} from "../../misc/form-component";
import {ConnectionSecurityElementComponent} from "./connection-security-element/connection-security-element.component";
import {CookieComponent} from "../../misc/cookie-component";
import {UserService} from "../../../service/user/user.service";
import {UserCategory} from "../../../service/user/userCategories";

@Component({
  selector: 'app-connection-security',
  standalone: true,
  imports: [
    NgForOf,
    CsElemComponent,
    FooterComponent,
    NgIf,
    NgxResizeObserverModule,
    ConnectionSecurityElementComponent
  ],
  templateUrl: './connection-security.component.html',
  styleUrl: './connection-security.component.scss'
})
export class ConnectionSecurityComponent extends CookieComponent implements OnInit {

  user!: User;
  userService!: UserService<any>
  userCategory!: UserCategory;

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
    this.el.nativeElement.style.width = `100%`;

    this.initializeUserByToken().then(() => {
      this.loggedInPage();
    });

    this.user = this.currentUserService.user!;
    this.userService = this.fetchUserService();
    this.userCategory = this.getCurrentUserCategory();
  }
}
