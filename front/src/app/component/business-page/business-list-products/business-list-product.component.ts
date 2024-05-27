import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {
  OrderHistoryElementListComponent
} from "../../user-account/order-history/order-history-element/order-history-element-list/order-history-element-list.component";
import {CookieComponent} from "../../misc/cookie-component";
import {Product} from "../../../model/odSystem/product";
import {CurrentUserService} from "../../../service/user/current-user.service";
import {CookieService} from "ngx-cookie-service";
import {BusinessService} from "../../../service/user/business.service";
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
  @Input() product: Product | undefined;
  @Output() addToBasketEmitter: EventEmitter<Product> = new EventEmitter<Product>();
  selectedImage: ProductImage | undefined

  constructor(
    protected override currentUserService: CurrentUserService,
    protected override cookieService: CookieService,
    protected override businessService: BusinessService) {
    super();
  }

  ngOnInit(): void {
    if(this.product != undefined && this.product!.productImages != undefined) {
      this.selectedImage = this.product!.productImages?.at(0)!
    }
  }

  addToBasket() {
    this.addToBasketEmitter.emit(this.product)
  }
}

