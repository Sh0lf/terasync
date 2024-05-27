import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PaymentMethod} from "../../../../model/odSystem/payment.method";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {NgIf} from "@angular/common";
import {CookieComponent} from "../../../misc/cookie-component";
import {Address} from "../../../../model/odSystem/address";
import {AddressService} from "../../../../service/odSystem/address.service";
import {CurrentUserService} from "../../../../service/user/current-user.service";
import {CookieService} from "ngx-cookie-service";
import {HttpErrorResponse} from "@angular/common/http";
import {PaymentMethodsComponent} from "../payment-methods.component";
import {PaymentMethodService} from "../../../../service/odSystem/payment-method.service";
import {faPen, faPenToSquare, faStar, faTrash, faXmark} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-payment-methods-element',
  standalone: true,
  imports: [
    FaIconComponent,
    NgIf
  ],
  templateUrl: './payment-methods-element.component.html',
  styleUrl: './payment-methods-element.component.scss'
})
export class PaymentMethodsElementComponent extends CookieComponent {
  @Output() newPaymentEvent = new EventEmitter<PaymentMethod>();
  @Input() payments!: PaymentMethod[] | undefined;
  @Input() payment!: PaymentMethod | undefined;

  faStar = faStar;
  faPen = faPen;
  faTrash = faTrash;

  constructor(protected paymentMethodService: PaymentMethodService,
              protected override currentUserService: CurrentUserService,
              protected override cookieService: CookieService) {
    super();
  }

  onDefaultOnClick() {
    let currentPaymentMethod = this.currentUserService.getDefaultPaymentMethod();
    if (currentPaymentMethod) {
      currentPaymentMethod.setDefaultPayment(false);
      this.paymentMethodService.updateEntity(currentPaymentMethod).subscribe({
        next: (payment: PaymentMethod) => {
          console.log("Old default payment method updated");
        },
        error: (error: HttpErrorResponse) => {
          console.log("HTTP ERROR: Old address not updated")
        }
      });
    }
    if (this.payment != undefined) {
      this.payment.setDefaultPayment(true);
      this.paymentMethodService.updateEntity(this.payment).subscribe({
        next: (payment: PaymentMethod) => {
          console.log(payment);
          console.log("New payment method updated");
        },
        error: (error: HttpErrorResponse) => {
          console.log("HTTP ERROR: New address not updated")
        }
      });
    }
  }

  onDelete() {
    if (this.payment != undefined) {
      this.paymentMethodService.deleteEntity(this.payment?.paymentMethodId!).subscribe({
        next: () => {
          console.log("Address deleted");
          this.payments?.splice(this.payments.indexOf(this.payment!), 1);

          this.checkForPaymentMethod();
        },
        error: () => {
          console.log("HTTP ERROR: Address not deleted")
        }
      });
    }
  }

  private checkForPaymentMethod() {
    let currentPaymentMethod: PaymentMethod | undefined = this.currentUserService.getDefaultPaymentMethod();

    if(currentPaymentMethod == undefined &&
      this.currentUserService.user?.paymentMethods != undefined &&
      this.currentUserService.user?.paymentMethods.length > 0) {
      let newPaymentMethod = this.currentUserService.user?.paymentMethods[0];
      newPaymentMethod?.setDefaultPayment(true);
      this.paymentMethodService.updateEntity(newPaymentMethod).subscribe({
        next: (payment: PaymentMethod) => {
          console.log(payment);
          console.log("No default payment method detected, updated first payment method as default");
        },
        error: (error: HttpErrorResponse) => {
          console.log("HTTP ERROR: New address not updated")
        }
      });
    }
  }

  modifyOnClick() {
    this.newPaymentEvent.emit(this.payment);
  }
}
