import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {LogoComponent} from "../logo/logo.component";
import {NgIf, NgStyle} from "@angular/common";
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
import 'resize-observer-polyfill/dist/ResizeObserver.global'
import {CurrentUserService} from "../../service/user/current-user.service";
import {FormsModule} from "@angular/forms";
import {Business} from "../../model/user/business";
import {HttpErrorResponse} from "@angular/common/http";
import {AutoCompleteCompleteEvent, AutoCompleteModule} from 'primeng/autocomplete';
import {NgxResizeObserverModule} from "ngx-resize-observer";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LogoComponent,
    FontAwesomeModule, NgStyle,
    FormsModule, AutoCompleteModule,
    NgxResizeObserverModule, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  host: {
    '[header-body]': 'true'
  }
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
  businesses: Business[] = [];

  searchBusiness: string = "";
  selectedBusiness: Business | string | undefined;

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
        this.businesses = Business.initializeBusinesses({businesses: businesses});
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching business:', error);
        console.log("HTTP ERROR / NA : No businesses found");
      }
    });
  }

  getFilteredBusinesses() {
    return this.businesses.filter(business =>
      business.getName().toLowerCase().includes(this.searchBusiness.toLowerCase()));
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

  onSearchBusiness(autoCompleteCompleteEvent: AutoCompleteCompleteEvent) {
    this.searchBusiness = autoCompleteCompleteEvent.query;
  }


  onClick() {
    if(this.selectedBusiness != undefined && this.selectedBusiness instanceof Business) {
      this.routeTo(`business-page/${this.selectedBusiness?.businessId}`);
    } else {
      // todo if business doesn't exists, routes to home and filters businesses with the input string
      this.routeTo(`/home`)
    }
  }

  onSubmit(event: KeyboardEvent) {
    if(event.key === 'Enter') {
      if(this.selectedBusiness != undefined && typeof this.selectedBusiness === 'string') {
        this.selectedBusiness = this.businesses.find(business => business.getName() === this.selectedBusiness);
        this.onClick();
      }
    }
  }
}
