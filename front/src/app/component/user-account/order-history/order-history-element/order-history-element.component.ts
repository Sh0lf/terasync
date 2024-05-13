import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {OrderHistoryElementListComponent} from "./order-history-element-list/order-history-element-list.component";
import {CookieComponent} from "../../../misc/cookie-component";
import {CustomerOrder} from "../../../../model/odSystem/customer.order";
import {Product} from "../../../../model/odSystem/product";
import {CustomerOrderList} from "../../../../model/odSystem/customer.order.list";
import {CurrentUserService} from "../../../../service/user/current-user.service";
import {BusinessService} from "../../../../service/user/business.service";
import {Router} from "@angular/router";
import {getDateTime} from "../../../misc/functions";
import {CustomerOrderService} from "../../../../service/odSystem/customer-order.service";
import {OrderHistoryRatingModalComponent} from "../order-history-rating-modal/order-history-rating-modal.component";
import {RatingListService} from "../../../../service/rating-list.service";

@Component({
  selector: 'app-order-history-element',
  standalone: true,
  imports: [
    NgForOf,
    OrderHistoryElementListComponent,
    NgIf,
    NgOptimizedImage,
    OrderHistoryRatingModalComponent
  ],
  templateUrl: './order-history-element.component.html',
  styleUrl: './order-history-element.component.scss'
})
export class OrderHistoryElementComponent extends CookieComponent implements OnInit {
  @Input() customerOrder!: CustomerOrder | undefined;
  @Output() onRateOrderEmitter = new EventEmitter<CustomerOrder>();

  creationTime: string | undefined;
  product: Product | undefined;
  total: number = 0;
  orderLists: CustomerOrderList[] | undefined;

  constructor(
    private ratingListService: RatingListService,
    protected override currentUserService: CurrentUserService,
    protected override cookieService: CookieService,
    protected override businessService: BusinessService,
    protected override customerOrderService: CustomerOrderService,
    override router: Router) {
    super();
  }

  ngOnInit(): void {
    this.creationTime = getDateTime(this.customerOrder!.creationTime)
    this.orderLists = this.customerOrder?.customerOrderLists;
    this.total = this.customerOrderService.getOrderTotal(this.customerOrder);

    this.ratingListService.findByCustomerOrderId(this.customerOrder!.customerOrderId)
      .subscribe(rating => {
      this.customerOrder?.setRated(rating != undefined);
    });
  }

  onClickRedirect() {
    this.router.navigate(['/user-account/order-history-detailed', this.customerOrder!.customerOrderId]).then();
  }
  onRateOrder() {
    this.onRateOrderEmitter.emit(this.customerOrder!);
  }

  isNotRated() {
    return !this.customerOrder?.rated && this.isCustomerCategory();
  }
}
