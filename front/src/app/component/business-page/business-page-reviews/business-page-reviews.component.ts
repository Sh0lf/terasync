import {Component, Input, OnInit} from '@angular/core';
import {RatingList} from "../../../model/rating.list";
import {CookieComponent} from "../../misc/cookie-component";
import {CurrentUserService} from "../../../service/user/current-user.service";
import {CookieService} from "ngx-cookie-service";
import {BusinessService} from "../../../service/user/business.service";
import {NgIf} from "@angular/common";
import {getDateTime} from "../../misc/functions";

@Component({
  selector: 'app-business-page-reviews',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './business-page-reviews.component.html',
  styleUrl: './business-page-reviews.component.scss'
})
export class BusinessPageReviewsComponent extends CookieComponent implements OnInit {
  @Input() review!: RatingList;
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
  }

}
