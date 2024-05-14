import {Component, EventEmitter, input, Input, OnInit, Output} from '@angular/core';
import {Product} from "../../../model/odSystem/product";
import {CurrentUserService} from "../../../service/user/current-user.service";
import {CookieService} from "ngx-cookie-service";
import {BusinessService} from "../../../service/user/business.service";
import {CookieComponent} from "../../misc/cookie-component";

@Component({
  selector: 'app-business-basket',
  standalone: true,
  imports: [],
  templateUrl: './business-basket.component.html',
  styleUrl: './business-basket.component.scss'
})
export class BusinessBasketComponent extends CookieComponent implements OnInit {
  @Output() removeFromBasketEmitter = new EventEmitter<Product>();
  @Input() productId: number | undefined;
  @Input() quantity: number | undefined;
  totalPriceList: number | undefined;
  @Input() products!: Product[] | undefined;
  product: Product | undefined;

  constructor(
    protected override currentUserService: CurrentUserService,
    protected override cookieService: CookieService,
    protected override businessService: BusinessService) {
    super();
  }

  ngOnInit(): void {
    this.product = this.products?.find(p => this.productId == p.productId)
    // @ts-ignore
    this.totalPriceList = this.product?.price * this.quantity;
  }

  removeFromBasket() {
    this.removeFromBasketEmitter.emit(this.product)
  }


}
