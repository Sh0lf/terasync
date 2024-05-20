import {Component, ElementRef, OnInit} from '@angular/core';
import {faCheck, faCreditCard, faPlus, faXmark} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {userCategories} from "../../../service/user/userCategories";
import {CookieComponent} from "../../misc/cookie-component";
import {CookieService} from "ngx-cookie-service";
import {ActivatedRoute, Router} from "@angular/router";
import {CustomerService} from "../../../service/user/customer.service";
import {BusinessService} from "../../../service/user/business.service";
import {AdminService} from "../../../service/user/admin.service";
import {DeliveryServiceService} from "../../../service/user/delivery-service.service";
import {DeliveryPersonService} from "../../../service/user/delivery-person.service";
import {CurrentUserService} from "../../../service/user/current-user.service";
import {ModalOpenType} from "../../misc/modal-open-type";
import {Address} from "../../../model/odSystem/address";
import {FormsModule} from "@angular/forms";
import {PaymentMethod} from "../../../model/odSystem/payment.method";
import {PaymentMethodService} from "../../../service/odSystem/payment-method.service";
import {AddressService} from "../../../service/odSystem/address.service";
import {paymentMethods} from "../profile-menu-item/profile-menu-item";
import {PaymentMethodsElementComponent} from "./payment-methods-element/payment-methods-element.component";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-payment-methods',
  standalone: true,
  imports: [
    FaIconComponent,
    FormsModule,
    PaymentMethodsElementComponent,
    NgForOf,
    NgIf
  ],
  templateUrl: './payment-methods.component.html',
  styleUrl: './payment-methods.component.scss'
})
export class PaymentMethodsComponent extends CookieComponent implements OnInit {

  faCreditCard = faCreditCard;
  modalOpenType: ModalOpenType | undefined;
  protected readonly ModalOpenType = ModalOpenType;
  protected readonly faPlus = faPlus;
  protected readonly faXmark = faXmark;
  protected readonly faCheck = faCheck;
  editingPaymentMethod: PaymentMethod | undefined;

  // Input Fields
  nameInput: string = '';
  cardInput: string = '';
  countryInput: string = '';
  streetInput: string = '';
  postalCodeInput: string = '';
  cityInput: string = '';
  isSubmitted: boolean | undefined;

  constructor(private el: ElementRef,
              protected override customerService: CustomerService,
              protected override businessService: BusinessService,
              protected override adminService: AdminService,
              protected override deliveryServiceService: DeliveryServiceService,
              protected override deliveryPersonService: DeliveryPersonService,
              protected override currentUserService: CurrentUserService,
              protected override cookieService: CookieService,
              protected paymentMethodService: PaymentMethodService,
              protected override router: Router, protected override route: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.initializeUserByToken().then(() => {
      this.loggedInPage();
    })

    this.el.nativeElement.style.width = `100%`;
  }

  toggleOnClick(modalOpenType: ModalOpenType) {
    this.modalOpenType = modalOpenType;
    this.resetValues();
  }

  onSubmit() {
    if(!this.isFormValid()) {
      return;
    }

    let defaultPaymentMethod = false;
    if(this.currentUserService.user?.paymentMethods!.length == 0) {
      defaultPaymentMethod = true;
    }

    if(this.modalOpenType == ModalOpenType.ADD) {
      let newPaymentMethod = new PaymentMethod(
        this.currentUserService.user?.getUserId()!,
        this.nameInput,
        this.cardInput,
        this.countryInput,
        this.postalCodeInput,
        this.cityInput,
        this.streetInput,
        defaultPaymentMethod)

      this.paymentMethodService.addEntity(newPaymentMethod).subscribe({
        next: (paymentMethod: PaymentMethod) => {
          this.currentUserService.user?.paymentMethods!.push(PaymentMethod.fromJson(paymentMethod));
          this.resetAll();
          console.log("New payment method added!");
        },
        error: (error: any) => {
          console.log("Error in adding new payment method")
        }
      })
    } else if(this.modalOpenType == ModalOpenType.EDIT && this.editingPaymentMethod != undefined) {
      this.editingPaymentMethod.name= this.nameInput;
      this.editingPaymentMethod.card= this.cardInput
      this.editingPaymentMethod.billingCountry= this.countryInput;
      this.editingPaymentMethod.billingStreet= this.streetInput;
      this.editingPaymentMethod.billingPostalCode = this.postalCodeInput;
      this.editingPaymentMethod.billingCity = this.cityInput;

      this.paymentMethodService.updateEntity(this.editingPaymentMethod).subscribe({
        next: (paymentMethod: PaymentMethod) => {
          this.resetAll();
          console.log("Payment Method Updated Added!");
        },
        error: (error: any) => {
          console.error("Error in updating Payment Method");
        }
      });
    }
  }

  private resetAll() {
    this.modalOpenType = ModalOpenType.NONE;
    this.editingPaymentMethod = undefined;

    this.resetValues();
  }

  private resetValues() {
    this.nameInput = '';
    this.cardInput = '';
    this.countryInput = '';
    this.streetInput = '';
    this.postalCodeInput = '';
    this.cityInput = '';
    this.isSubmitted = false;
  }

  editPayment(payment: PaymentMethod) {
    this.modalOpenType = ModalOpenType.EDIT;
    this.nameInput = payment.name;
    this.cardInput = payment.card;
    this.countryInput = payment.billingCountry;
    this.streetInput = payment.billingStreet;
    this.postalCodeInput = payment.billingPostalCode;
    this.cityInput = payment.billingCity;
    this.editingPaymentMethod = payment;
  }

  isEnabled() {
    return this.modalOpenType != ModalOpenType.NONE;
  }

  isFormValid(): boolean {
    return this.nameInput.length > 0 &&
      this.cardInput.length == 16 &&
      this.countryInput.length > 0 &&
      this.streetInput.length > 0 &&
      this.postalCodeInput.length > 0 &&
      this.cityInput.length > 0;
  }

  isFormInvalid(): boolean {
    return !this.isFormValid() && this.isSubmitted!;
  }


}
