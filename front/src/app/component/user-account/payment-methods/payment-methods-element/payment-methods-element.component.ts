import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PaymentMethod} from "../../../../model/odSystem/payment.method";

@Component({
  selector: 'app-payment-methods-element',
  standalone: true,
  imports: [],
  templateUrl: './payment-methods-element.component.html',
  styleUrl: './payment-methods-element.component.css'
})
export class PaymentMethodsElementComponent {
  @Output() newPaymentEvent = new EventEmitter<PaymentMethod>();
  @Input() payments!: PaymentMethod[] | undefined;
  @Input() payment!: PaymentMethod;

}
