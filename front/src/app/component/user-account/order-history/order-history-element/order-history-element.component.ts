import {Component, Input, OnInit} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {OrderHistoryElementListComponent} from "./order-history-element-list/order-history-element-list.component";
import {CookieComponent} from "../../../misc/cookie-component";
import {CustomerOrder} from "../../../../model/odSystem/customer.order";
import {Business} from "../../../../model/user/business";
import {Product} from "../../../../model/odSystem/product";
import {CustomerOrderList} from "../../../../model/odSystem/customer.order.list";
import {CurrentUserService} from "../../../../service/user/current-user.service";
import {BusinessService} from "../../../../service/user/business.service";
import {ProductService} from "../../../../service/odSystem/product.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-order-history-element',
  standalone: true,
  imports: [
    NgForOf,
    OrderHistoryElementListComponent,
    NgIf,
    NgOptimizedImage
  ],
  templateUrl: './order-history-element.component.html',
  styleUrl: './order-history-element.component.scss'
})
export class OrderHistoryElementComponent extends CookieComponent implements OnInit {
  @Input() order!: CustomerOrder | undefined;
  @Input() orders!: CustomerOrder[] | undefined;

  business : Business | undefined;
  creationTime: string | undefined;
  product: Product | undefined;
  total: number = 0;
  orderLists: CustomerOrderList[] | undefined;

  constructor(
    protected override currentUserService: CurrentUserService,
    protected override cookieService: CookieService,
    protected override businessService: BusinessService,
    protected productService: ProductService,
    override router: Router,) {
    super();
  }

  ngOnInit(): void{
    let businessId = this.order!.businessId;
    this.fetchBusinessById(businessId);
    this.transformCreationTime(this.order!.creationTime)
    this.orderLists = this.order?.customerOrderLists;
    this.sumTotal(this.orderLists);
  }

  fetchBusinessById(id: number): void {
    this.businessService.findEntityById(id).subscribe({
      next: (business: Business) => {
        this.business = business;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching business:', error);
        console.log("HTTP ERROR / NA : No business found");
      }
    });
  }

  sumTotal(orderLists: CustomerOrderList[] | undefined): void{
    if (orderLists != undefined) {
      for (let orderList of orderLists) {
        this.productService.findEntityById(orderList.productId).subscribe({
          next: (product: Product) => {
            this.total = this.total + (product.price * orderList.quantity);
          },
          error: (error: HttpErrorResponse) => {
            console.error('Error fetching product:', error);
            console.log("HTTP ERROR / NA : No product found");
          }
        })
      }
    }
  }

  transformCreationTime(time: String): void {
    let splitted = time.split(" ")
    let date = splitted[0].split("-")
    let times=splitted[1].split(":")

    this.creationTime = date[0] + "/" + date[1] + "/" + date[2] + " at " + times[0] + ":" + times[1];
  }

  onClickRedirect() {
    this.router.navigate(['/user-account/order-history-detailed', this.order!.customerOrderId]);
  }
}
