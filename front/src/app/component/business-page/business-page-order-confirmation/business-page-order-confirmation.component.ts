import {booleanAttribute, Component, EventEmitter, Input, Output} from '@angular/core';
import {faCheck, faStar, faXmark} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {KeyValuePipe, NgForOf, NgIf} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {Product} from "../../../model/odSystem/product";
import {BusinessBasketComponent} from "../business-basket/business-basket.component";

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
export class BusinessPageOrderConfirmationComponent {

  protected readonly faCheck = faCheck;
  protected readonly faXmark = faXmark;
  protected readonly faStar = faStar;
  @Input() isModalOpen!: boolean;
  @Input() basket!: Map<number, number>;
  @Output() onClickCancelEmitter = new EventEmitter<boolean>();
  @Input() allProducts!: Product[] | undefined;

  constructor() {
  }

  clickCancel():void{
    this.onClickCancelEmitter.emit(false);
  }

  getTotalPrice(): number {
    if (!this.basket) return 0;
    let total: number = 0;
    for (let [productId, quantity] of this.basket){
      let product = this.allProducts?.find(p => productId === p.productId)
      // @ts-ignore
      total = total + (product.price * quantity)
    }
    return total;
  }
}
