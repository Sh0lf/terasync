import {Component, ElementRef, OnInit} from '@angular/core';
import {faUserGroup} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {ProductElementComponent} from "../manage-products/product-element/product-element.component";
import {CookieComponent} from "../../misc/cookie-component";
import {DeliveryServiceElementComponent} from "./delivery-service-element/delivery-service-element.component";
import {DeliveryService} from "../../../model/user/delivery.service";
import {businessCategory} from "../../../service/user/userCategories";
import {DeliveryServiceService} from "../../../service/user/delivery-service.service";
import {CurrentUserService} from "../../../service/user/current-user.service";
import {CookieService} from "ngx-cookie-service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-choose-delivery-services',
  standalone: true,
  imports: [
    FaIconComponent,
    FormsModule,
    NgForOf,
    NgIf,
    ProductElementComponent,
    DeliveryServiceElementComponent
  ],
  templateUrl: './choose-delivery-services.component.html',
  styleUrl: './choose-delivery-services.component.scss'
})
export class ChooseDeliveryServicesComponent extends CookieComponent implements OnInit {
  faUserGroup = faUserGroup;
  searchDeliveryService: string = "";

  constructor(private el: ElementRef,
              protected override cookieService: CookieService,
              protected override deliveryServiceService: DeliveryServiceService,
              protected override currentUserService: CurrentUserService,
              protected override router: Router, protected override route: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.specificUserPage(businessCategory).then((success) => {
      if(success) this.initializeAllDeliveryServices();
    });

    this.el.nativeElement.style.width = `100%`;
  }

  clearFilters() {
    this.searchDeliveryService = "";
  }

  getFilteredDeliveryServices() {
    return this.currentUserService.user?.deliveryServices?.filter(deliveryService => {
      return deliveryService.getName()?.toLowerCase().includes(this.searchDeliveryService.toLowerCase());
    });
  }
}
