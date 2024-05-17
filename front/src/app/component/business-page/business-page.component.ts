import {Component, OnInit} from '@angular/core';
import {faTableList} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {ActivatedRoute, Router, RouterOutlet} from "@angular/router";
import {NgxResizeObserverModule} from "ngx-resize-observer";
import {KeyValuePipe, NgForOf, NgIf, NgStyle} from "@angular/common";
import {
  OrderHistoryElementComponent
} from "../user-account/order-history/order-history-element/order-history-element.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CustomerService} from "../../service/user/customer.service";
import {AdminService} from "../../service/user/admin.service";
import {DeliveryServiceService} from "../../service/user/delivery-service.service";
import {DeliveryPersonService} from "../../service/user/delivery-person.service";
import {CookieService} from "ngx-cookie-service";
import {CurrentUserService} from "../../service/user/current-user.service";
import {CustomerOrderService} from "../../service/odSystem/customer-order.service";
import {CookieComponent} from "../misc/cookie-component";
import {
  OrderHistoryElementListComponent
} from "../user-account/order-history/order-history-element/order-history-element-list/order-history-element-list.component";
import {RatingListService} from "../../service/rating-list.service";
import {BusinessListProductComponent} from "./business-list-products/business-list-product.component";
import {Product} from "../../model/odSystem/product";
import {BusinessBasketComponent} from "./business-basket/business-basket.component";
import {
  BusinessPageOrderConfirmationComponent
} from "./business-page-order-confirmation/business-page-order-confirmation.component";
import {BusinessPageReviewsComponent} from "./business-page-reviews/business-page-reviews.component";
import {VariablesService} from "../../service/misc/variables.service";
import {ProductImageService} from "../../service/odSystem/product-image.service";
import {ProductService} from "../../service/odSystem/product.service";
import {BusinessService} from "../../service/user/business.service";

@Component({
  selector: 'app-business-page',
  standalone: true,
  imports: [
    RouterOutlet,
    NgxResizeObserverModule,
    NgForOf,
    OrderHistoryElementComponent,
    NgIf,
    FaIconComponent,
    ReactiveFormsModule,
    FormsModule,
    OrderHistoryElementListComponent,
    BusinessListProductComponent,
    BusinessBasketComponent,
    KeyValuePipe,
    BusinessPageOrderConfirmationComponent,
    BusinessPageReviewsComponent,
    NgStyle
  ],
  templateUrl: './business-page.component.html',
  styleUrl: './business-page.component.scss'
})
export class BusinessPageComponent extends CookieComponent implements OnInit {

  protected readonly faTableList = faTableList;
  ratingAverage: number = 0;

  basket = new Map<number, number>;
  product: Product | undefined;
  confirmOrderModal: boolean = false;

  previousProducts: Product[] = [];

  constructor(protected override variablesService: VariablesService,
              protected override customerService: CustomerService,
              protected override adminService: AdminService,
              protected override deliveryServiceService: DeliveryServiceService,
              protected override deliveryPersonService: DeliveryPersonService,
              protected override cookieService: CookieService,
              protected override currentUserService: CurrentUserService,
              protected override customerOrderService: CustomerOrderService,
              protected override productService: ProductService,
              protected override productImageService: ProductImageService,
              protected override businessService: BusinessService,
              protected ratingService: RatingListService,
              protected override router: Router, protected override route: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    if(this.variablesService.selectedBusiness == undefined) {
      this.routeToHome().then();
    } else {
      this.initializeBusinessesVariable().then(() => {
        this.initializeUsersPfpImgUrl(this.variablesService.businesses, this.businessService).then();
        this.variablesService.businesses.forEach(business => {
          this.initializeProductImages(business.products!)
        });
      });
    }

    this.initializeUserByToken().then(() => {
      let previousCustomerOrders = this.currentUserService.user?.customerOrders?.filter(order => order.businessId == this.variablesService.selectedBusiness?.getUserId()!);
      let uniqueProductIdSet = new Set<number>();
      if (previousCustomerOrders != undefined && previousCustomerOrders.length > 0) {

        for (let previousCustomerOrder of previousCustomerOrders) {
          let previousOrderLists = previousCustomerOrder.customerOrderLists;

          for (let previousOrderList of previousOrderLists) {
            if (!uniqueProductIdSet.has(previousOrderList.productId)) {
              uniqueProductIdSet.add(previousOrderList.productId);
              if (previousOrderList.product) {
                this.previousProducts.push(this.variablesService.selectedBusiness?.products.find(product => product.productId == previousOrderList.productId)!);
              }
            }
          }
        }
      }
    });


  }

  addToBasket(product: Product) {
    if (product.productId != undefined) {
      let quantity = this.basket.get(product.productId);
      if (quantity === undefined) {
        this.basket.set(product.productId, 1);
      } else {
        this.basket.set(product.productId, quantity + 1);
      }
    }
  }


  removeFromBasket(product: Product) {
    if (product.productId != undefined) {
      let quantity = this.basket.get(product.productId);
      if (quantity !== undefined) {
        if (quantity === 1) {
          this.basket.delete(product.productId);
        } else {
          this.basket.set(product.productId, quantity - 1);
        }
      }
    }
    console.log(this.basket);
  }

  getTotalPrice(): number {
    if (!this.basket) return 0;
    let total: number = 0;
    this.variablesService.selectedBusiness?.products?.forEach(product => {
      if (product.productId != undefined && this.basket.has(product.productId!)) {
        total = total + (product.price * this.basket.get(product.productId!)!);
      }
    });
    return total;
  }

  openConfirmOrder() {
    this.confirmOrderModal = true;
  }

  closeConfirmOrder(newVal: boolean) {
    this.confirmOrderModal = newVal;
  }

  hasRating() {
    return this.variablesService.selectedBusiness?.ratingLists.length != 0;
  }

  getRatingAmount() {
    return this.variablesService.selectedBusiness?.ratingLists.length;
  }

}
