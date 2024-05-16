import { Component } from '@angular/core';
import {FooterComponent} from "../footer/footer.component";
import {CookieComponent} from "../misc/cookie-component";
import {NgxResizeObserverModule} from "ngx-resize-observer";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faClock, faFire, faLocation, faLocationDot} from "@fortawesome/free-solid-svg-icons";
import {UserService} from "../../service/user/user.service";
import {CurrentUserService} from "../../service/user/current-user.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FooterComponent,
    NgxResizeObserverModule,
    FaIconComponent,
    NgIf
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent extends CookieComponent {
  constructor(
  protected override currentUserService: CurrentUserService) {
    super();

  }
  protected readonly faLocation = faLocation;
  protected readonly faLocationDot = faLocationDot;
  protected readonly faClock = faClock;
  protected readonly faFire = faFire;
  protected readonly UserService = UserService;

}
