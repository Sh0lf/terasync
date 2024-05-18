import {Component, EventEmitter, Input, Output} from '@angular/core';
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {KeyValuePipe, NgForOf, NgIf} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {Product} from "../../../model/odSystem/product";
import {BusinessBasketComponent} from "../business-basket/business-basket.component";
import {getTotalPrice} from "../business-page.component";
import {BasketService} from "../../../service/misc/basket.service";
import {CookieComponent} from "../../misc/cookie-component";
import {ActivatedRoute, Router} from "@angular/router";
import {Business} from "../../../model/user/business";

@Component({
  selector: 'app-business-page-order-confirmation',
  standalone: true,
  imports: [
    FaIconComponent,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    BusinessBasketComponent,
    KeyValuePipe
  ],
  templateUrl: './business-page-order-confirmation.component.html',
  styleUrl: './business-page-order-confirmation.component.scss'
})
export class BusinessPageOrderConfirmationComponent extends CookieComponent {

  faXmark = faXmark;
  protected readonly getTotalPrice = getTotalPrice;

  @Input() isModalOpen!: boolean;
  @Output() onCancelEmitter = new EventEmitter<boolean>();

  @Input() basket!: Map<number, number>;
  @Input() business!: Business | undefined;

  constructor(private basketService: BasketService,
              protected override router: Router, protected override route: ActivatedRoute) {
    super();
  }

  onCancel(): void {
    this.onCancelEmitter.emit(false);
  }

  onConfirm() {
    this.basketService.setBasket(this.basket);
    this.basketService.setBusiness(this.business!)
    this.onCancelEmitter.emit(false);

    this.routeTo("/checkout");
  }

}
