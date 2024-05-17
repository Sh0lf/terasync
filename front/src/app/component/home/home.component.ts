import {AfterViewInit, APP_INITIALIZER, Component, OnInit} from '@angular/core';
import {FooterComponent} from "../footer/footer.component";
import {CookieComponent} from "../misc/cookie-component";
import {NgxResizeObserverModule} from "ngx-resize-observer";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faClock, faFire, faLocationDot} from "@fortawesome/free-solid-svg-icons";
import {UserService} from "../../service/user/user.service";
import {CurrentUserService} from "../../service/user/current-user.service";
import {NgForOf, NgIf} from "@angular/common";
import {BusinessService} from "../../service/user/business.service";
import {CookieService} from "ngx-cookie-service";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductImageService} from "../../service/odSystem/product-image.service";
import {ProductService} from "../../service/odSystem/product.service";
import {VariablesService} from "../../service/misc/variables.service";
import {Observable, Subject} from "rxjs";
import {subscribe} from "node:diagnostics_channel";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FooterComponent,
    NgxResizeObserverModule,
    FaIconComponent,
    NgIf,
    NgForOf
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent extends CookieComponent implements OnInit, AfterViewInit {

  constructor(protected override variablesService: VariablesService,
              protected override currentUserService: CurrentUserService,
              protected override cookieService: CookieService,
              protected override productImageService: ProductImageService,
              protected override productService: ProductService,
              protected override businessService: BusinessService,
              protected override router: Router, protected override route: ActivatedRoute) {
    super();
  }

  faLocationDot = faLocationDot;

  faClock = faClock;
  faFire = faFire;
  ngOnInit(): void {
    this.initializeUserByToken().then();
    this.initializeBusinessesVariable().then();
  }

  ngAfterViewInit(): void {
    this.initializeUsersPfpImgUrl(this.variablesService.businesses, this.businessService).then();
  }

}


