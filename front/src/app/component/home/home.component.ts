import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FooterComponent} from "../footer/footer.component";
import {CookieComponent} from "../misc/cookie-component";
import {NgxResizeObserverModule} from "ngx-resize-observer";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faClock, faFire, faLocationDot} from "@fortawesome/free-solid-svg-icons";
import {UserService} from "../../service/user/user.service";
import {CurrentUserService} from "../../service/user/current-user.service";
import {NgForOf, NgIf} from "@angular/common";
import {BusinessService} from "../../service/user/business.service";
import {Business} from "../../model/user/business";
import {CookieService} from "ngx-cookie-service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";

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

  businesses!: Business[] | undefined;

  constructor(protected override currentUserService: CurrentUserService,
              protected override cookieService: CookieService,
              protected override businessService: BusinessService,
              protected override router: Router, protected override route: ActivatedRoute) {
    super();
  }

  protected readonly faLocationDot = faLocationDot;

  protected readonly faClock = faClock;
  protected readonly faFire = faFire;
  protected readonly UserService = UserService;

  ngOnInit(): void {
    this.businessService.getAllEntities().subscribe({
      next: (businesses: Business[]) => {
        this.businesses = Business.initializeBusinesses({businesses: businesses});
      },
      error: (error: HttpErrorResponse) => {
        console.log("Error: " + error);
      }
    });
  }

  ngAfterViewInit(): void {
    this.initializeUsersPfpImgUrl(this.businesses, this.businessService).then();
  }
}


