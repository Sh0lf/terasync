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

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    BusinessBasketComponent,
    KeyValuePipe,
    NgForOf,
    AddressElementComponent,
    FormsModule
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent extends CookieComponent implements OnInit {

  selectedAddress!: Address | undefined;
  selectedDeliveryService!: DeliveryService | undefined;
  selectedPackaging!: Packaging | undefined;

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
      this.selectedAddress = this.currentUserService.user?.addresses?.find(a => a.defaultAddress);

      this.initializeDeliveryServicesVariable().then((success) => {
        if (success) {
          this.selectedDeliveryService = this.getAllowedDeliveryServices()[0];
        }
      });

      this.initializePackagingsVariable().then((success) => {
        if (success) {
          this.selectedPackaging = this.variablesService.packagings[0];
        }
      })
    }
  }

  protected readonly getTotalPrice = getTotalPrice;

  getAllowedDeliveryServices() {
    return this.variablesService.deliveryServices.filter(ds => {
      return this.basketService?.business?.deliveryServiceLists.filter(dsl => dsl.deliveryServiceId === ds.deliveryServiceId).length !== 0;
    });
  }

  onPay() {
    let newCustomerOrder = new CustomerOrder(1, this.selectedPackaging?.packagingId!,
      this.currentUserService.user?.customerId!,
      this.basketService.business?.businessId!,
      this.selectedDeliveryService?.deliveryServiceId!,
      1,
      this.selectedAddress?.addressId!)

    this.customerOrderService.addEntity(newCustomerOrder).subscribe({
      next: (jsonCustomerOrder: CustomerOrder) => {
        this.customerOrderService.findEntityById(jsonCustomerOrder.customerOrderId!).subscribe({
          next: (jsonCustomerOrder: CustomerOrder) => {
            let customerOrder = CustomerOrder.fromJson(jsonCustomerOrder);
            console.log(customerOrder);
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
                        console.log(customerOrderList)
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
  }
}
