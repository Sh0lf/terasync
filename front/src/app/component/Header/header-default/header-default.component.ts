import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, Output, ViewChild} from '@angular/core';
import {LogoComponent} from "../../logo/logo.component";
import {NgIf, NgOptimizedImage, NgStyle} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {CookieComponent} from "../../misc/cookie-component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faBars, faChevronDown, faChevronUp, faXmark} from '@fortawesome/free-solid-svg-icons';
import {HeaderDropDownMenuComponent} from "../header-drop-down-menu/header-drop-down-menu.component";

@Component({
  selector: 'app-header-default',
  standalone: true,
  imports: [LogoComponent, NgOptimizedImage, NgIf, FontAwesomeModule, NgStyle, HeaderDropDownMenuComponent],
  templateUrl: './header-default.component.html',
  styleUrl: './header-default.component.scss',
  host: {
    '[header-body]': 'true'
  },
})
export class HeaderDefaultComponent extends CookieComponent implements OnInit, AfterViewInit {
  // Logic Fields
  @Output() isUserLoggedIn: boolean = false;
  @Output() showMenu: boolean = false;
  @Output() dropDownMenuTop: number = 0;

  // Font Awesome Icons
  faBars = faBars;
  faChevronDown = faChevronDown;
  faChevronUp = faChevronUp;

  // DOM Elements
  @ViewChild('headerBody',) headerBody!: ElementRef;

  // Icon Fields
  xMark = faXmark;

  constructor(protected override cookieService: CookieService,
              private cd: ChangeDetectorRef,
              protected router: Router, protected route: ActivatedRoute) {
    super();
  }

  ngAfterViewInit(): void {
    // setTimeout(() => {
    //   this.headerBodyWidth = this.headerBody.nativeElement.offsetHeight + 10;
    // }, 0);

    this.setDropDownMenuTop();
    this.cd.detectChanges();
  }

  ngOnInit(): void {
    this.isUserLoggedIn = this.hasUserToken();

    // const headerBody = document.getElementById("header-body")
    // if (headerBody) {
    //   let obs = new ResizeObserver(entries => {
    //     for (let entry of entries) {
    //       const dropDownMenu = document.getElementById("drop-down-menu");
    //       if (dropDownMenu) {
    //         dropDownMenu.style.top = (entry.contentRect.height + 10) + "px";
    //       }
    //     }
    //   });
    //   obs.observe(headerBody);
    // }
  }

  loginOnClick() {
    this.router.navigate(['/login'], {relativeTo: this.route}).then();
  }

  registerOnClick() {
    this.router.navigate(['/register'], {relativeTo: this.route}).then();
  }

  onResize() {
    this.setDropDownMenuTop();
  }

  setDropDownMenuTop() {
    this.dropDownMenuTop = this.headerBody.nativeElement.offsetHeight + 10;
  }

  burgerMenuOnClick() {
    this.showMenu = !this.showMenu;
  }

  xMarkOnClick() {
    this.showMenu = false;
  }
}
