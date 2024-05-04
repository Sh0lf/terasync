import {Component, ElementRef, OnInit} from '@angular/core';
import {faBowlFood, faUserAlt, faUserGroup} from "@fortawesome/free-solid-svg-icons";
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
import {businessCategory, deliveryPersonCategory, deliveryServiceCategory} from "../../../service/user/userCategories";

@Component({
  selector: 'app-manage-delivery-persons',
  standalone: true,
  imports: [
    FaIconComponent
  ],
  templateUrl: './manage-delivery-persons.component.html',
  styleUrl: './manage-delivery-persons.component.scss'
})
export class ManageDeliveryPersonsComponent extends CookieComponent implements OnInit {

  faUserGroup = faUserGroup;

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
      this.specificUserPage(deliveryServiceCategory)
    })

    this.el.nativeElement.style.width = `100%`;
  }
}
