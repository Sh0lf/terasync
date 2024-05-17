import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {LogoComponent} from "../logo/logo.component";
import {NgForOf, NgIf, NgStyle} from "@angular/common";
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
import {AutoCompleteCompleteEvent, AutoCompleteModule} from 'primeng/autocomplete';
import {NgxResizeObserverModule} from "ngx-resize-observer";
import {VariablesService} from "../../service/misc/variables.service";
import {ProductImageService} from "../../service/odSystem/product-image.service";
import {ProductService} from "../../service/odSystem/product.service";
import {logout, ProfileMenuItem, profileMenuItems} from "../user-account/profile-menu-item/profile-menu-item";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LogoComponent,
    FontAwesomeModule, NgStyle,
    FormsModule, AutoCompleteModule,
    NgxResizeObserverModule, NgIf, NgForOf],
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

  searchBusiness: string = "";
  selectedBusiness: Business | string | undefined;

  constructor(protected override variablesService: VariablesService,
              protected override customerService: CustomerService,
              protected override businessService: BusinessService,
              protected override adminService: AdminService,
              protected override deliveryServiceService: DeliveryServiceService,
              protected override deliveryPersonService: DeliveryPersonService,
              protected override currentUserService: CurrentUserService,
              protected override productImageService: ProductImageService,
              protected override productService: ProductService,
              protected override cookieService: CookieService,
              protected override router: Router, protected override route: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.initializeUserByToken().then();
    this.initializeBusinessesVariable().then();
  }

  getFilteredBusinesses() {
    return this.variablesService.businesses.filter(business =>
      business.getName().toLowerCase().includes(this.searchBusiness.toLowerCase()));
  }

  routeToAndCloseBurgerMenu(profileMenuItem: ProfileMenuItem) {
    if(profileMenuItem != logout) {
      this.routeTo(profileMenuItem.link)
    } else {
      this.loginOnClick();
    }

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
    if (this.selectedBusiness != undefined && this.selectedBusiness instanceof Business) {
      this.variablesService.setSelectedBusiness(this.selectedBusiness)

      this.routeTo('business-page');
    } else {
      // todo if business doesn't exists, routes to home and filters businesses with the input string
      this.routeTo('home')
    }
  }

  onSubmit(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      if (this.selectedBusiness != undefined && typeof this.selectedBusiness === 'string') {
        this.selectedBusiness = this.variablesService.businesses.find(business => business.getName() === this.selectedBusiness);
        this.onClick();
      }
    }
  }

  protected readonly profileMenuItems = profileMenuItems;
}
