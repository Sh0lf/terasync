import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {LogoComponent} from "../../logo/logo.component";
import {NgIf, NgOptimizedImage, NgStyle} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {CookieComponent} from "../../misc/cookie-component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {
  faArrowRightFromBracket,
  faBars,
  faCartShopping,
  faChevronDown,
  faChevronUp,
  faGear,
  faHeart,
  faQuestion,
  faXmark
} from '@fortawesome/free-solid-svg-icons';
import {CustomerService} from "../../../service/user/customer.service";
import {BusinessService} from "../../../service/user/business.service";
import {AdminService} from "../../../service/user/admin.service";
import {DeliveryServiceService} from "../../../service/user/delivery-service.service";
import {DeliveryPersonService} from "../../../service/user/delivery-person.service";
import {NgxResizeObserverModule} from "ngx-resize-observer";
import 'resize-observer-polyfill/dist/ResizeObserver.global'
import {
  businessCategory,
  customerCategory,
  deliveryServiceCategory,
  UserCategory
} from "../../../service/user/userCategories";

@Component({
  selector: 'app-header-default',
  standalone: true,
  imports: [LogoComponent, NgOptimizedImage, NgIf, FontAwesomeModule, NgStyle, NgxResizeObserverModule],
  templateUrl: './header-default.component.html',
  styleUrl: './header-default.component.scss',
  host: {
    '[header-body]': 'true'
  },
})
export class HeaderDefaultComponent extends CookieComponent implements OnInit {
  // Logic Fields
  showMenu: boolean = false;
  dropDownMenuTop: number = 0;

  // Font Awesome Icons
  faBars = faBars;
  faChevronDown = faChevronDown;
  faChevronUp = faChevronUp;
  faXmark = faXmark;
  faGear = faGear;
  faCartShopping = faCartShopping;
  faHeart = faHeart;
  faQuestion = faQuestion;
  faArrowRightFromBracket = faArrowRightFromBracket;

  // DOM Elements
  @ViewChild('headerBody') headerBody!: ElementRef;

  // User Categories
  protected readonly businessCategory = businessCategory;
  protected readonly deliveryServiceCategory = deliveryServiceCategory;

  constructor(protected override customerService: CustomerService,
              protected override businessService: BusinessService,
              protected override adminService: AdminService,
              protected override deliveryServiceService: DeliveryServiceService,
              protected override deliveryPersonService: DeliveryPersonService,
              protected override cookieService: CookieService,
              protected router: Router, protected route: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.checkUserLoggedIn();
    this.setUserByToken();
  }

  loginOnClick() {
    this.router.navigate(['/login'], {relativeTo: this.route}).then();
  }

  logoutOnClick() {
    this.deleteUserToken();
    this.resetUserCategoryToCustomer();
    window.location.reload();
  }

  registerOnClick() {
    this.router.navigate(['/register'], {relativeTo: this.route}).then();
  }

  burgerMenuOnClick() {
    this.showMenu = !this.showMenu;
  }

  xMarkOnClick() {
    this.showMenu = false;
  }

  handleResize(entry: any) {
    this.dropDownMenuTop = entry.contentRect.height + 10;
  }

  registerAs(userCategory: UserCategory) {
    this.setCurrentUserCategory(userCategory);
    this.router.navigate(['/register'], {relativeTo: this.route}).then();
  }
}
