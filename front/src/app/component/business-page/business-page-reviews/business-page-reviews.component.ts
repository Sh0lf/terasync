import {Component, Input, OnInit} from '@angular/core';
import {RatingList} from "../../../model/rating.list";
import {CookieComponent} from "../../misc/cookie-component";
import {CurrentUserService} from "../../../service/user/current-user.service";
import {CookieService} from "ngx-cookie-service";
import {BusinessService} from "../../../service/user/business.service";
import {NgForOf, NgIf} from "@angular/common";
import {getDateTime} from "../../misc/functions";
import {RatingStar} from "../../user-account/order-history/order-history-rating-modal/rating-star";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'app-business-page-reviews',
  standalone: true,
  imports: [
    NgIf,
    FaIconComponent,
    NgForOf
  ],
  templateUrl: './business-page-reviews.component.html',
  styleUrl: './business-page-reviews.component.scss'
})
export class BusinessPageReviewsComponent extends CookieComponent implements OnInit {
  @Input() review!: RatingList;
  ratingStars: RatingStar[] = [];

  reviewDate: string | undefined;


  constructor(
    protected override currentUserService: CurrentUserService,
    protected override cookieService: CookieService,
    protected override businessService: BusinessService) {
    super();
  }

  ngOnInit(): void {
    if (this.review.ratingDate != null) {
      this.reviewDate = getDateTime(this.review.ratingDate)
    }

    let rating = this.review.rating;

    for (let i = 1; i <= 5; i++) {
      this.ratingStars.push(new RatingStar(i));
      if(rating > 0) {
        this.ratingStars.at(i - 1)?.setClicked(true);
        rating--;
      }
    }
  }

  protected readonly faStar = faStar;
}
