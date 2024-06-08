import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CookieComponent} from "../../misc/cookie-component";
import {getTotalPrice} from "../../business-page/business-page.component";
import {BusinessBasketComponent} from "../../business-page/business-basket/business-basket.component";
import {KeyValuePipe, NgForOf, NgIf} from "@angular/common";
import {NgxResizeObserverModule} from "ngx-resize-observer";

@Component({
  selector: 'app-checkout-error',
  standalone: true,
  imports: [
    BusinessBasketComponent,
    KeyValuePipe,
    NgForOf,
    NgIf,
    NgxResizeObserverModule
  ],
  templateUrl: './checkout-error.component.html',
  styleUrl: './checkout-error.component.scss'
})
export class CheckoutErrorComponent extends CookieComponent {
  constructor(protected override router: Router, protected override route: ActivatedRoute) {
    super();
  }

  onConfirm(): void{
    this.routeToHome().then;
  }
}
