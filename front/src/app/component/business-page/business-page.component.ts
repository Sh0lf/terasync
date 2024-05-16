import {Component, OnInit} from '@angular/core';
import {faTableList} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {ActivatedRoute, Router, RouterOutlet} from "@angular/router";
import {NgxResizeObserverModule} from "ngx-resize-observer";
import {KeyValuePipe, NgForOf, NgIf} from "@angular/common";
import {
  OrderHistoryElementComponent
} from "../user-account/order-history/order-history-element/order-history-element.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Business} from "../../model/user/business";
import {CustomerService} from "../../service/user/customer.service";
import {BusinessService} from "../../service/user/business.service";
import {AdminService} from "../../service/user/admin.service";
import {DeliveryServiceService} from "../../service/user/delivery-service.service";
import {DeliveryPersonService} from "../../service/user/delivery-person.service";
import {CookieService} from "ngx-cookie-service";
import {CurrentUserService} from "../../service/user/current-user.service";
import {CustomerOrderService} from "../../service/odSystem/customer-order.service";
import {CookieComponent} from "../misc/cookie-component";
import {HttpErrorResponse} from "@angular/common/http";
import {
  OrderHistoryElementListComponent
} from "../user-account/order-history/order-history-element/order-history-element-list/order-history-element-list.component";
import {CustomerOrder} from "../../model/odSystem/customer.order";
import {RatingList} from "../../model/rating.list";
import {RatingListService} from "../../service/rating-list.service";
import {BusinessListProductComponent} from "./business-list-products/business-list-product.component";
import {CustomerOrderList} from "../../model/odSystem/customer.order.list";
import {filter} from "rxjs";
import {Product} from "../../model/odSystem/product";
import {BusinessBasketComponent} from "./business-basket/business-basket.component";
import {
  BusinessPageOrderConfirmationComponent
} from "./business-page-order-confirmation/business-page-order-confirmation.component";
import {BusinessPageReviewsComponent} from "./business-page-reviews/business-page-reviews.component";

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
    BusinessPageReviewsComponent
  ],
  templateUrl: './business-page.component.html',
  styleUrl: './business-page.component.scss'
})
export class BusinessPageComponent extends CookieComponent implements OnInit {

  protected readonly faTableList = faTableList;
  business: Business | undefined;
  ratingAverage: number = 0;
  ratingNbr: number | undefined = 0;

  previousProducts: Product[] = [];
  allProducts: Product[] | undefined;
  basket = new Map<number, number>;
  product: Product | undefined;
  confirmOrderModal: boolean = false;

  constructor(
    protected override customerService: CustomerService,
    protected override businessService: BusinessService,
    protected override adminService: AdminService,
    protected override deliveryServiceService: DeliveryServiceService,
    protected override deliveryPersonService: DeliveryPersonService,
    protected override cookieService: CookieService,
    protected override currentUserService: CurrentUserService,
    protected override customerOrderService: CustomerOrderService,
    protected ratingService: RatingListService,
    protected override router: Router, protected override route: ActivatedRoute) {
    super();
  }

  ngOnInit(){
    this.initializeUserByToken().then(()=> {
      this.route.params.subscribe(params => {
        let id = params['id'];
        this.businessService.findEntityById(id).subscribe({
          next: (business: Business) => {
            this.business = Business.fromJson(business);
          },
          error: (error: HttpErrorResponse) => {
            console.error('Error fetching business:', error);
            console.log("HTTP ERROR / NA : No businesses found");
            this.router.navigate(['']).then();
            return;
          }
        })
        this.ratingAverage = this.ratingService.getRatingAverage(this.business?.ratingLists)
        this.ratingNbr = this.business?.ratingLists.length;
        let previousOrders = this.currentUserService.user?.customerOrders?.filter(order => order.businessId == parseInt(id));
        console.log(previousOrders)
        let uniqueProductIdSet = new Set<number>();
        if (previousOrders) {
          for (let previousOrder of previousOrders) {
            let previousOrderLists = previousOrder.customerOrderLists;
            for (let previousOrderList of previousOrderLists) {
              if (!uniqueProductIdSet.has(previousOrderList.productId)) {
                uniqueProductIdSet.add(previousOrderList.productId);
                if (previousOrderList.product) {
                  this.previousProducts.push(previousOrderList.product);
                }
              }
            }
          }
        }
        this.allProducts = this.business?.products
      });
    });
  }

  addToBasket(product: Product) {
    const productId = product.productId;
    // @ts-ignore
    const quantity = this.basket.get(productId);
    if (quantity === undefined) {
      // @ts-ignore
      this.basket.set(productId, 1);
    } else {
      // @ts-ignore
      this.basket.set(productId, quantity + 1);
    }
    console.log(this.basket);
  }


  removeFromBasket(product: Product) {
    const productId = product.productId; // Assuming product ID is accessible as productId property
    // @ts-ignore
    const quantity = this.basket.get(productId);
    if (quantity !== undefined) {
      if (quantity === 1) {
        // @ts-ignore
        this.basket.delete(productId);
      } else {
        // @ts-ignore
        this.basket.set(productId, quantity - 1);
      }
    }
    console.log(this.basket);
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

  openConfirmOrder(){
    this.confirmOrderModal = true;
  }

  closeConfirmOrder(newVal: boolean) {
    this.confirmOrderModal = newVal;
  }
}
