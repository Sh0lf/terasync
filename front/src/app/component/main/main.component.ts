import {Component} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {HttpClientModule} from "@angular/common/http";
import {NgForOf, NgIf} from "@angular/common";
import {LoginComponent} from "../Authentication/login/login.component";
import {HeaderDefaultComponent} from "../Header/header-default/header-default.component";
import {FooterComponent} from "../footer/footer.component";
import {RegisterComponent} from "../Authentication/register/register.component";
import {StorageKeys} from "../misc/storage-keys";

@Component({
  selector: 'main-component',
  standalone: true,
  imports: [RouterOutlet, NgForOf, HttpClientModule, LoginComponent, HeaderDefaultComponent, FooterComponent, NgIf, RegisterComponent],
  templateUrl: 'main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  public title = 'teraSyncFront';
  excludedHeaderRoutes = ['/login', '/partner-selection', '/register', '/verify-email', '/password-recovery', '/password-reset/'];
  excludedFooterRoutes = ['/login', '/partner-selection', '/register', '/verify-email', '/password-recovery', '/password-reset'];

  constructor(private router: Router) {
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
