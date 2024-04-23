import {Component, OnInit} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {HttpClientModule, HttpErrorResponse} from "@angular/common/http";
import {NgForOf, NgIf} from "@angular/common";
import {LoginComponent} from "../Authentication/login/login.component";
import {HeaderDefaultComponent} from "../Header/header-default/header-default.component";
import {FooterComponent} from "../footer/footer.component";
import {RegisterComponent} from "../Authentication/register/register.component";

@Component({
  selector: 'main-component',
  standalone: true,
  imports: [RouterOutlet, NgForOf, HttpClientModule, LoginComponent, HeaderDefaultComponent, FooterComponent, NgIf, RegisterComponent],
  templateUrl: 'main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  public title = 'teraSyncFront';
  excludedHeaderRoutes = ['/login', '/partner-selection', '/register', '/verify-email', '/password-recovery', '/password-reset'];
  excludedFooterRoutes = ['/login', '/partner-selection', '/register', '/verify-email', '/password-recovery', '/password-reset'];

  constructor(private router: Router) {
  }

  isCurrentRoute(...route: string[]): boolean {
    return route.includes(this.router.url);
  }

  isNotExcludedHeaderRoute(): boolean {
    return !this.excludedHeaderRoutes.includes(this.router.url);
  }

  isNotExcludedFooterRoute(): boolean {
    return !this.excludedFooterRoutes.includes(this.router.url);
  }
}
