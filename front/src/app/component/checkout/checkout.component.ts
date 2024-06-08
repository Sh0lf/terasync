import {Component, OnInit} from '@angular/core';
import {CookieComponent} from "../misc/cookie-component";
import {ActivatedRoute, Router} from "@angular/router";
import {BasketService} from "../../service/misc/basket.service";
import {BusinessBasketComponent} from "../business-page/business-basket/business-basket.component";
import {KeyValue, KeyValuePipe, NgForOf} from "@angular/common";
import {getTotalPrice} from "../business-page/business-page.component";
import {
  AddressElementComponent
} from "../user-account/user-settings/addresses/address-element/address-element.component";
import {CustomerService} from "../../service/user/customer.service";
import {CookieService} from "ngx-cookie-service";
import {CurrentUserService} from "../../service/user/current-user.service";
import {FormsModule} from "@angular/forms";
import {Address} from "../../model/odSystem/address";
import {DeliveryService} from "../../model/user/delivery.service";
import {VariablesService} from "../../service/misc/variables.service";
import {DeliveryServiceService} from "../../service/user/delivery-service.service";
import {Packaging} from "../../model/odSystem/packaging";
import {PackagingService} from "../../service/odSystem/packaging.service";
import {CustomerOrder} from "../../model/odSystem/customer.order";
import {Customer} from "../../model/user/customer";
import {HttpErrorResponse} from "@angular/common/http";
import {CustomerOrderService} from "../../service/odSystem/customer-order.service";
import {CustomerOrderListService} from "../../service/odSystem/customer-order-list.service";
import {CustomerOrderList} from "../../model/odSystem/customer.order.list";
import {Observable} from "rxjs";
import {PaymentMethod} from "../../model/odSystem/payment.method";
import {faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    BusinessBasketComponent,
    KeyValuePipe,
    NgForOf,
    AddressElementComponent,
    FormsModule,
    FaIconComponent
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent extends CookieComponent implements OnInit {

  selectedAddressId!: number | undefined;
  selectedDeliveryServiceId!: number | undefined;
  selectedPackagingId!: number | undefined;
  selectedPaymentMethodId!: number | undefined;

  errorMsg: string = "";
  checkoutError: boolean = true;

  constructor(protected basketService: BasketService,
              protected override customerOrderService: CustomerOrderService,
              protected customerOrderListService: CustomerOrderListService,
              protected override variablesService: VariablesService,
              protected override packagingService: PackagingService,
              protected override currentUserService: CurrentUserService,
              protected override cookieService: CookieService,
              protected override customerService: CustomerService,
              protected override deliveryServiceService: DeliveryServiceService,
              protected override router: Router, protected override route: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    if (this.basketService.basket.size === 0 || this.basketService.business == undefined) {
      this.routeToHome().then();
    } else {
      this.selectedAddressId = this.currentUserService.user?.addresses?.find(a => a.defaultAddress)?.addressId;
      this.selectedPaymentMethodId = this.currentUserService.user?.paymentMethods?.find(pm => pm.defaultPaymentMethod)?.paymentMethodId;

      this.initializeDeliveryServicesVariable().then((success) => {
        if (success) {
          this.checkoutError = false;
          this.selectedDeliveryServiceId = this.getAllowedDeliveryServices()[0].deliveryServiceId;
        }
      });

      this.initializePackagingsVariable().then((success) => {
        if (success) {
          this.selectedPackagingId = this.variablesService.packagings[0].packagingId;
        }
      })
    }
    if (this.checkoutError){
      this.routeTo('/checkout-error')
    }
  }

  protected readonly getTotalPrice = getTotalPrice;

  getAllowedDeliveryServices() {
    return this.variablesService.deliveryServices.filter(ds => {
      return this.basketService?.business?.deliveryServiceLists.filter(dsl => dsl.deliveryServiceId === ds.deliveryServiceId).length !== 0;
    });
  }

  onPay() {
    if(this.selectedPackagingId != undefined && this.selectedDeliveryServiceId != undefined &&
      this.selectedAddressId != undefined && this.selectedPaymentMethodId != undefined) {
      let newCustomerOrder = new CustomerOrder(1, this.selectedPackagingId!,
        this.currentUserService.user?.customerId!,
        this.basketService.business?.businessId!,
        this.selectedDeliveryServiceId!,
        1,
        this.selectedAddressId!,
        this.selectedPaymentMethodId!)

      console.log(newCustomerOrder)

      this.customerOrderService.addEntity(newCustomerOrder).subscribe({
        next: (jsonCustomerOrder: CustomerOrder) => {
          this.customerOrderService.findEntityById(jsonCustomerOrder.customerOrderId!).subscribe({
            next: (jsonCustomerOrder: CustomerOrder) => {
              let customerOrder = CustomerOrder.fromJson(jsonCustomerOrder);
              this.basketService.setNewCustomerOrder(customerOrder);
              let addedCount = 0;
              new Observable<number>(observer => {
                this.basketService.basket.forEach((productId, quantity) => {
                  let customerOrderList = new CustomerOrderList(productId, quantity, this.basketService.getNewCustomerOrder()?.customerOrderId!);

                  this.customerOrderListService.addEntity(customerOrderList).subscribe({
                    next: (jsonCustomerOrderList: CustomerOrderList) => {
                      this.customerOrderListService.findEntityById(jsonCustomerOrderList.customerOrderListId!).subscribe({
                        next: (jsonCustomerOrderList: CustomerOrderList) => {
                          let customerOrderList = CustomerOrderList.fromJson(jsonCustomerOrderList);
                          this.basketService.getNewCustomerOrder()?.customerOrderLists.push(customerOrderList);
                          observer.next(++addedCount);
                        },
                        error: (error: HttpErrorResponse) => console.error(error)
                      });
                    },
                    error: (error: HttpErrorResponse) => console.error(error)
                  });
                });
              }).subscribe({
                next: (addedCount: number) => {
                  if (addedCount === this.basketService.basket.size) {
                    this.basketService.basket.clear();
                    this.routeTo('/order-history-detailed');
                  }
                }
              });
            },
            error: (error: HttpErrorResponse) => console.error(error)
          });
        },
        error: (error: HttpErrorResponse) => console.error(error)
      });
    } else {
      this.errorMsg = "Please fill in all fields";
    }
  }

    protected readonly faTrash = faTrash;
  protected readonly faPlus = faPlus;

  addAddressOnClick() {
    this.routeTo('/user-account');
  }
}
