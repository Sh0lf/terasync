import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
  @Input() entry!: [Product, number];
  @Output() removeFromBasketEmitter = new EventEmitter<Product>();
  product: Product | undefined;
  quantity: number | undefined ;

  constructor(
    protected override currentUserService: CurrentUserService,
    protected override cookieService: CookieService,
    protected override businessService: BusinessService) {
    super();
  }

  ngOnInit(): void {
    this.product = this.entry[0];
    this.quantity = this.entry[1];
  }

  removeFromBasket() {
    this.removeFromBasketEmitter.emit(this.product)
  }
}
