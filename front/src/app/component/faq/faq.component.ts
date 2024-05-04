import {Component, ElementRef, OnInit} from '@angular/core';
import {faQuestion} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {CustomerService} from "../../service/user/customer.service";
import {BusinessService} from "../../service/user/business.service";
import {AdminService} from "../../service/user/admin.service";
import {DeliveryServiceService} from "../../service/user/delivery-service.service";
import {DeliveryPersonService} from "../../service/user/delivery-person.service";
import {CurrentUserService} from "../../service/user/current-user.service";
import {CookieService} from "ngx-cookie-service";
import {ActivatedRoute, Router} from "@angular/router";
import {deliveryServiceCategory} from "../../service/user/userCategories";
import {CookieComponent} from "../misc/cookie-component";

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [
    FaIconComponent
  ],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss'
})
export class FaqComponent extends CookieComponent implements OnInit {

  protected readonly faQuestion = faQuestion;

  constructor(private el: ElementRef,
              protected override cookieService: CookieService,
              protected override router: Router, protected override route: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.el.nativeElement.style.width = `100%`;
  }
}
