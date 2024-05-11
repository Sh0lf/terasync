import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {faCheck, faStar, faXmark} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {NgForOf, NgIf} from "@angular/common";
import {ModalComponent} from "../../../misc/modal-component";
import {CustomerOrder} from "../../../../model/odSystem/customer.order";
import {RatingStar} from "./rating-star";
import {FormsModule} from "@angular/forms";
import {RatingList} from "../../../../model/rating.list";
import {CurrentUserService} from "../../../../service/user/current-user.service";
import {CustomerService} from "../../../../service/user/customer.service";
import {RatingListService} from "../../../../service/rating-list.service";

@Component({
  selector: 'app-order-history-rating-modal',
  standalone: true,
  imports: [
    FaIconComponent,
    NgIf,
    NgForOf,
    FormsModule
  ],
  templateUrl: './order-history-rating-modal.component.html',
  styleUrl: './order-history-rating-modal.component.scss'
})
export class OrderHistoryRatingModalComponent extends ModalComponent implements OnInit {

  faXmark = faXmark;
  faCheck = faCheck;
  faStar = faStar;

  @Input() override isModalOpen = false
  @Output() override onModalChangeEmitter = new EventEmitter<boolean>()

  @Input() ratingCustomerOrder!: CustomerOrder | undefined;

  ratingStars: RatingStar[] = [];
  comment: string = "";

  constructor(private ratingListService: RatingListService,
              protected override customerService: CustomerService,
              protected override currentUserService: CurrentUserService) {
    super();
  }

  ngOnInit(): void {
    for (let i = 1; i <= 5; i++) {
      this.ratingStars.push(new RatingStar(i));
    }
  }

  isFormValid(): boolean {
    return false;
  }

  override closeModal() {
    super.closeModal();
    this.comment = "";
    for (let star of this.ratingStars) {
      star.isClicked = false;
      star.isHovered = false;
    }
  }

  onSaveChanges() {
    let ratingList = new RatingList(this.getRating(), this.comment,
      this.currentUserService.user?.getUserId()!,
      this.ratingCustomerOrder?.businessId!);

    this.ratingListService.addEntity(ratingList).subscribe({
      next: (jsonRatingList: RatingList) => {
        console.log("Rating added: ", jsonRatingList);
        this.ratingCustomerOrder!.rated = true;
        this.onModalChangeEmitter.emit(false);
      },
      error: (error) => {
        console.error("Error adding rating: ", error);
      }
    });
  }

  private getRating() {
    let rating = 0;
    for (let star of this.ratingStars) {
      if (star.isClicked) {
        rating = star.value;
      }
    }
    return rating;
  }

  onStarClicked(ratingStar: RatingStar) {
    for (let star of this.ratingStars) {
      star.isClicked = star.value <= ratingStar.value;
    }
    ratingStar.isClicked = true;
  }

  onStarHover(ratingStar: RatingStar) {
    for (let star of this.ratingStars) {
      star.isHovered = star.value <= ratingStar.value;
    }
    ratingStar.isHovered = true;
  }

  onMouseOut() {
    for (let star of this.ratingStars) {
      star.isHovered = false;
    }
  }
}
