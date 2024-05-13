import {Component, OnInit} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {CookieComponent} from "../misc/cookie-component";
import {CookieService} from "ngx-cookie-service";
import {NgIf} from "@angular/common";
import {HeaderComponent} from "../header/header.component";

@Component({
  selector: 'main-component',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, NgIf],
  templateUrl: 'main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent extends CookieComponent implements OnInit {
  // Excluded Routes for headers / footers
  excludedHeaderRoutes = ['/login', '/partner-selection', '/register', '/verify-email', '/password-recovery', '/password-reset/'];
  excludedFooterRoutes = ['/login', '/partner-selection', '/register', '/verify-email', '/password-recovery', '/password-reset'];

  constructor(protected override cookieService: CookieService,
              protected override router: Router) {
    super();
  }

  ngOnInit(): void {
    this.getCurrentUserCategory();
  }

  isCurrentRoute(route: string): boolean {
    return this.router.url.includes(route);
  }

  isNotExcludedHeaderRoute(): boolean {
    for (let i = 0; i < this.excludedHeaderRoutes.length; i++) {
      if (this.isCurrentRoute(this.excludedHeaderRoutes[i])) {
        return false;
      }
    }
    return true;
  }

  isNotExcludedFooterRoute(): boolean {
    for (let i = 0; i < this.excludedFooterRoutes.length; i++) {
      if (this.isCurrentRoute(this.excludedFooterRoutes[i])) {
        return false;
      }
    }
    return true;
  }
}
