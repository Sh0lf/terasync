import {Component, Input, OnInit, Output} from '@angular/core';
import {CustomerOrder} from "../../../model/odSystem/customer.order";
import {CurrentUserService} from "../../../service/user/current-user.service";
import {CookieService} from "ngx-cookie-service";
import {CustomerOrderService} from "../../../service/odSystem/customer-order.service";
import {Business} from "../../../model/user/business";
import {BusinessService} from "../../../service/user/business.service";
import {HttpErrorResponse} from "@angular/common/http";
import {CookieComponent} from "../../misc/cookie-component";
import {CustomerOrderListService} from "../../../service/odSystem/customer-order-list.service";
import {CustomerOrderList} from "../../../model/odSystem/customer.order.list";
import {NgForOf} from "@angular/common";
import {ProductService} from "../../../service/odSystem/product.service";
import {Product} from "../../../model/odSystem/product";
import {OrderHistoryElementListComponent} from "./order-history-element-list/order-history-element-list.component";

@Component({
  selector: 'app-order-history-element',
  standalone: true,
  imports: [
    NgForOf,
    OrderHistoryElementListComponent
  ],
  templateUrl: './order-history-element.component.html',
  styleUrl: './order-history-element.component.scss'
})
export class OrderHistoryElementComponent extends CookieComponent implements OnInit {
  @Input() order!: CustomerOrder | undefined;
  @Input() orders!: CustomerOrder[] | undefined;

  business : Business | undefined;
  orderLists: CustomerOrderList[] | undefined
  product: Product | undefined

  constructor(
    protected override currentUserService: CurrentUserService,
    protected override cookieService: CookieService,
    protected override businessService: BusinessService,) {
    super();
  }

  ngOnInit(): void{
    let businessId = this.order!.businessId;
    this.fetchBusinessById(businessId);
    this.orderLists = this.order!.customerOrderLists;
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

  // don't even know if this is a solution

}
