import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../../../model/odSystem/product";
import {HttpErrorResponse} from "@angular/common/http";
import {CurrentUserService} from "../../../../service/user/current-user.service";
import {CookieService} from "ngx-cookie-service";
import {BusinessService} from "../../../../service/user/business.service";
import {CookieComponent} from "../../../misc/cookie-component";
import {CustomerOrderList} from "../../../../model/odSystem/customer.order.list";
import {ProductService} from "../../../../service/odSystem/product.service";

@Component({
  selector: 'app-order-history-element-list',
  standalone: true,
  imports: [],
  templateUrl: './order-history-element-list.component.html',
  styleUrl: './order-history-element-list.component.scss'
})
export class OrderHistoryElementListComponent extends CookieComponent implements OnInit{
  @Input() orderList!: CustomerOrderList;

  constructor(
    protected override currentUserService: CurrentUserService,
    protected override cookieService: CookieService,
    protected override businessService: BusinessService,
    protected productService: ProductService) {
    super();
  }

  product: Product | undefined;

  ngOnInit(): void {
    let productId = this.orderList.productId
    this.fetchProductById(productId)
  }

  fetchProductById(id: number): void {
    this.productService.findEntityById(id).subscribe({
      next: (product: Product) =>{
        console.log('Product:', product.name);
        this.product = product;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching product:', error);
        console.log("HTTP ERROR / NA : No product found found");
      },
    });
  }

}
