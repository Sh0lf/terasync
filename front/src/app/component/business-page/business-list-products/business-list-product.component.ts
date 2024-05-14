import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {
  OrderHistoryElementListComponent
} from "../../user-account/order-history/order-history-element/order-history-element-list/order-history-element-list.component";
import {CookieComponent} from "../../misc/cookie-component";
import {CustomerOrder} from "../../../model/odSystem/customer.order";
import {Product} from "../../../model/odSystem/product";
import {CustomerOrderList} from "../../../model/odSystem/customer.order.list";
import {CurrentUserService} from "../../../service/user/current-user.service";
import {CookieService} from "ngx-cookie-service";
import {BusinessService} from "../../../service/user/business.service";
import {CustomerOrderService} from "../../../service/odSystem/customer-order.service";
import {Router} from "@angular/router";
import {getDateTime, randomIntFromInterval} from "../../misc/functions";
import {ProductImage} from "../../../model/odSystem/product.image";

@Component({
  selector: 'app-business-list-product',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    OrderHistoryElementListComponent,
    NgOptimizedImage
  ],
  templateUrl: './business-list-product.component.html',
  styleUrl: './business-list-product.component.scss'
})
export class BusinessListProductComponent extends CookieComponent implements OnInit {
  @Output() onRateOrderEmitter = new EventEmitter<CustomerOrder>();
  @Input() product: Product | undefined;
  selectedImage: ProductImage | undefined

  constructor(
    protected override currentUserService: CurrentUserService,
    protected override cookieService: CookieService,
    protected override businessService: BusinessService,
    protected override customerOrderService: CustomerOrderService,
    override router: Router) {
    super();
  }

  ngOnInit(): void {
    let images = this.product!.productImages
    this.selectedImage = images[0]
  }

}

