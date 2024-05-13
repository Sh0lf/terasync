import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {LogoComponent} from "../logo/logo.component";
import {NgForOf, NgIf, NgOptimizedImage, NgStyle} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {CookieComponent} from "../misc/cookie-component";
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
import {CustomerService} from "../../service/user/customer.service";
import {BusinessService} from "../../service/user/business.service";
import {AdminService} from "../../service/user/admin.service";
import {DeliveryServiceService} from "../../service/user/delivery-service.service";
import {DeliveryPersonService} from "../../service/user/delivery-person.service";
import {NgxResizeObserverModule} from "ngx-resize-observer";
import 'resize-observer-polyfill/dist/ResizeObserver.global'
import {
  businessCategory,
  customerCategory,
  deliveryServiceCategory,
  UserCategory
} from "../../service/user/userCategories";
import {CurrentUserService} from "../../service/user/current-user.service";
import {FormsModule} from "@angular/forms";
import {Business} from "../../model/user/business";
import {Observable} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LogoComponent, NgOptimizedImage, NgIf, FontAwesomeModule, NgStyle, NgxResizeObserverModule, FormsModule, NgForOf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  host: {
    '[header-body]': 'true'
  },
})
export class HeaderComponent extends CookieComponent implements OnInit {
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
  searchQuery: string = '';
  businesses: Business[] = [];
  searchResults: Business[] = [];

  constructor(protected override customerService: CustomerService,
              protected override businessService: BusinessService,
              protected override adminService: AdminService,
              protected override deliveryServiceService: DeliveryServiceService,
              protected override deliveryPersonService: DeliveryPersonService,
              protected override currentUserService: CurrentUserService,
              protected override cookieService: CookieService,
              protected override router: Router, protected override route: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.initializeUserByToken().then();
    this.businessService.getAllEntities().subscribe({
      next: (businesses: Business[]) => {
        this.businesses = businesses;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching business:', error);
        console.log("HTTP ERROR / NA : No businesses found");
      }
    });
  }

  search(): void {
    if (this.searchQuery.trim() === '') {
      this.searchResults = [];
      return;
    }

    for(let business of this.businesses){
      if(business.getName().includes(this.searchQuery)){
        this.searchResults.push(business);
      }
    }
  }

  routeToAndCloseBurgerMenu(route: string) {
    this.routeTo(route)
    this.showMenu = false;
  }

  loginOnClick() {
    this.router.navigate(['/login'], {relativeTo: this.route}).then();
  }

  burgerMenuOnClick() {
    this.showMenu = !this.showMenu;
  }

  xMarkOnClick() {
    this.showMenu = false;
  }

  handleResize(entry: ResizeObserverEntry) {
    this.dropDownMenuTop = entry.contentRect.height + 10;
  }

  redirect(business: Business) {
    this.router.navigate(['/business-page', business.businessId]).then();
  }
}
