import {Component, Input} from '@angular/core';
import {FooterComponent} from "../footer/footer.component";
import {CookieComponent} from "../misc/cookie-component";
import {NgxResizeObserverModule} from "ngx-resize-observer";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faClock, faFire, faLocation, faLocationDot} from "@fortawesome/free-solid-svg-icons";
import {UserService} from "../../service/user/user.service";
import {CurrentUserService} from "../../service/user/current-user.service";
import {NgForOf, NgIf} from "@angular/common";
import {BusinessService} from "../../service/user/business.service";
import {Business} from "../../model/user/business";
import {Product} from "../../model/odSystem/product";

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
export class HomeComponent extends CookieComponent {

  @Input() businesses!: Business[] | undefined;
  constructor(
  protected override currentUserService: CurrentUserService,
  protected override businessService: BusinessService) {
    super();

  }
  protected readonly faLocation = faLocation;
  protected readonly faLocationDot = faLocationDot;
  protected readonly faClock = faClock;
  protected readonly faFire = faFire;
  protected readonly UserService = UserService;
  ngOnInit(): void {
    this.businessService.getAllEntities().subscribe(businesses => {
      this.businesses = businesses;
    });
  }
}


