import {Component, OnInit} from '@angular/core';
import {CookieComponent} from "../misc/cookie-component";
import {CookieService} from "ngx-cookie-service";
import {businessCategory} from "../../service/user/userCategories";
import {faBurger, faLocationDot} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {CurrentUserService} from "../../service/user/current-user.service";
import {BusinessService} from "../../service/user/business.service";
import {CustomerService} from "../../service/user/customer.service";
import {AdminService} from "../../service/user/admin.service";
import {DeliveryServiceService} from "../../service/user/delivery-service.service";
import {DeliveryPersonService} from "../../service/user/delivery-person.service";

@Component({
  selector: 'app-manage-products',
  standalone: true,
  imports: [
    FaIconComponent
  ],
  templateUrl: './manage-products.component.html',
  styleUrl: './manage-products.component.scss'
})
export class ManageProductsComponent extends CookieComponent implements OnInit {

  constructor(protected override customerService: CustomerService,
              protected override businessService: BusinessService,
              protected override adminService: AdminService,
              protected override deliveryServiceService: DeliveryServiceService,
              protected override deliveryPersonService: DeliveryPersonService,
              protected override currentUserService: CurrentUserService,
              protected override cookieService: CookieService) {
    super();
  }


  ngOnInit(): void {
    this.initializeUserByToken().then(() => {
      this.specificUserPage(businessCategory)
    })
  }

  protected readonly faLocationDot = faLocationDot;
  protected readonly faBurger = faBurger;
}
