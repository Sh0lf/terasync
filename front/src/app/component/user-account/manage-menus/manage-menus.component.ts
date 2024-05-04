import {Component, ElementRef, OnInit} from '@angular/core';
import {CookieComponent} from "../../misc/cookie-component";
import {businessCategory} from "../../../service/user/userCategories";
import {faBowlFood} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {NgForOf} from "@angular/common";
import {ProductElementComponent} from "../manage-products/product-element/product-element.component";
import {ReactiveFormsModule} from "@angular/forms";
import {CustomerService} from "../../../service/user/customer.service";
import {BusinessService} from "../../../service/user/business.service";
import {AdminService} from "../../../service/user/admin.service";
import {DeliveryServiceService} from "../../../service/user/delivery-service.service";
import {DeliveryPersonService} from "../../../service/user/delivery-person.service";
import {CurrentUserService} from "../../../service/user/current-user.service";
import {CookieService} from "ngx-cookie-service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-manage-menus',
  standalone: true,
  imports: [
    FaIconComponent,
    NgForOf,
    ProductElementComponent,
    ReactiveFormsModule
  ],
  templateUrl: './manage-menus.component.html',
  styleUrl: './manage-menus.component.scss'
})
export class ManageMenusComponent extends CookieComponent implements OnInit {
  faBowlFood = faBowlFood;


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
      this.specificUserPage(businessCategory)
    })

    this.el.nativeElement.style.width = `100%`;
  }
}
