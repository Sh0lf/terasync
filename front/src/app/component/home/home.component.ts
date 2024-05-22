import {AfterViewInit, APP_INITIALIZER, Component, ElementRef, OnInit} from '@angular/core';
import {FooterComponent} from "../footer/footer.component";
import {CookieComponent} from "../misc/cookie-component";
import {NgxResizeObserverModule} from "ngx-resize-observer";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faClock, faFire, faLocationDot} from "@fortawesome/free-solid-svg-icons";
import {UserService} from "../../service/user/user.service";
import {CurrentUserService} from "../../service/user/current-user.service";
import {AsyncPipe, NgForOf, NgIf, NgStyle} from "@angular/common";
import {BusinessService} from "../../service/user/business.service";
import {CookieService} from "ngx-cookie-service";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductImageService} from "../../service/odSystem/product-image.service";
import {ProductService} from "../../service/odSystem/product.service";
import {VariablesService} from "../../service/misc/variables.service";
import {find, Observable, Subject} from "rxjs";
import {subscribe} from "node:diagnostics_channel";
import {Business} from "../../model/user/business";
import {HttpErrorResponse} from "@angular/common/http";
import {DomSanitizer, SafeStyle} from "@angular/platform-browser";
import {CustomerOrder} from "../../model/odSystem/customer.order";
import {DeliveryPerson} from "../../model/user/delivery.person";
import {DeliveryService} from "../../model/user/delivery.service";
import {Status} from "../../model/odSystem/status";
import {
  businessCategory,
  customerCategory,
  deliveryPersonCategory,
  deliveryServiceCategory
} from "../../service/user/userCategories";
import {Customer} from "../../model/user/customer";
import {CustomerService} from "../../service/user/customer.service";
import {AdminService} from "../../service/user/admin.service";
import {DeliveryServiceService} from "../../service/user/delivery-service.service";
import {DeliveryPersonService} from "../../service/user/delivery-person.service";
import {CustomerOrderService} from "../../service/odSystem/customer-order.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FooterComponent,
    NgxResizeObserverModule,
    FaIconComponent,
    NgIf,
    NgForOf,
    NgStyle,
    AsyncPipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent extends CookieComponent implements OnInit, AfterViewInit {
  statuses: Status[] = [];
  deliveryPeople: DeliveryPerson[] = [];
  deliveryServices: DeliveryService[] = [];
  businesses: Business[] = [];

  constructor(protected override customerService: CustomerService,
              protected override businessService: BusinessService,
              protected override adminService: AdminService,
              protected override deliveryServiceService: DeliveryServiceService,
              protected override deliveryPersonService: DeliveryPersonService,
              protected override cookieService: CookieService,
              protected override currentUserService: CurrentUserService,
              protected override variablesService: VariablesService,
              protected override router: Router, protected override route: ActivatedRoute) {
    super();
  }

  faLocationDot = faLocationDot;

  faClock = faClock;
  faFire = faFire;

  customerOrders: CustomerOrder[] | undefined = [];

  images: String[] = [];

  ngOnInit(): void {
    this.initializeUserByToken().then(()=>{
      this.specificUserPage(customerCategory, deliveryPersonCategory, deliveryServiceCategory, businessCategory).then();
      if (this.currentUserService.user?.customerOrders!) {
        this.fetchCustomerOrdersParentEntities(
          this.currentUserService.user?.customerOrders!
        ).then((parentEntities) => {
          // Use a Set to store unique businesses
          console.log(parentEntities.businesses)
          const uniqueBusinesses = new Set<Business>(parentEntities.businesses);
          console.log(uniqueBusinesses)
          // Convert the Set back to an array
          this.businesses = Array.from(uniqueBusinesses);
          console.log(this.businesses)

          this.initializeUsersPfpImgUrl(this.businesses, this.businessService).then()
          let imgvariable = {}
        });
        this.initializeBusinessesVariable().then();
      }
    });
  }

  ngAfterViewInit(): void {
    this.initializeUsersPfpImgUrl(this.variablesService.businesses, this.businessService).then();
  }

  onClick(business: Business): void {
    console.log("test")
    this.variablesService.setSelectedBusiness(business);
    this.routeTo('/business-page');
  }
}

