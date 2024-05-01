import {Component, Input, Output} from '@angular/core';
import {CustomerOrder} from "../../../model/odSystem/customer.order";
import {CookieComponent} from "../../misc/cookie-component";
import {CurrentUserService} from "../../../service/user/current-user.service";
import {CookieService} from "ngx-cookie-service";
import {CustomerOrderService} from "../../../service/odSystem/customer-order.service";
import {Business} from "../../../model/user/business";
import {BusinessService} from "../../../service/user/business.service";
import {CustomerOrderListService} from "../../../service/odSystem/customer-order-list.service";
import {subscribe} from "node:diagnostics_channel";
import {businessCategory} from "../../../service/user/userCategories";
import {Address} from "../../../model/odSystem/address";
import {HttpErrorResponse} from "@angular/common/http";


@Component({
  selector: 'app-order-history-element',
  standalone: true,
  imports: [],
  templateUrl: './order-history-element.component.html',
  styleUrl: './order-history-element.component.scss'
})
export class OrderHistoryElementComponent extends CookieComponent {
  @Input() order!: CustomerOrder | undefined;
  @Input() orders!: CustomerOrder[] | undefined;

  business : Business | undefined;

  constructor(
    protected override currentUserService = CurrentUserService,
    protected override cookieService = CookieService,
    protected customerOrderService = CustomerOrderService,
    protected override businessService = BusinessService,) {
    super();
  }

  ngOnInit(): void{
    let businessId = this.order!.businessId
    this.fetchBusinessById(businessId);
  }

  fetchBusinessById(id: number): void {
    this.businessService.findEntityById(id).subscribe({
      next: (business: Business) => {
        console.log('Business:', business);
        this.business = business;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching business:', error);
        console.log("HTTP ERROR / NA : No business found");
      }
    });
  }
}
