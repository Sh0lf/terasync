import {Component} from '@angular/core';
import {customerCategory, userCategories, UserCategory} from "../../../service/user/userCategories";
import {NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {StorageKeys} from "../../misc/storage-keys";
import {LogoComponent} from "../../logo/logo.component";
import {CookieService} from "ngx-cookie-service";
import {CookieComponent} from "../../misc/cookie-component";
import {FooterComponent} from "../../footer/footer.component";
import {NgxResizeObserverModule} from "ngx-resize-observer";

@Component({
  selector: 'app-partner-selection',
  standalone: true,
  imports: [
    NgForOf,
    NgIf, LogoComponent, FooterComponent, NgxResizeObserverModule
  ],
  templateUrl: './partner-selection.component.html',
  styleUrls: ['../commonCss/auth.styles.scss', './partner-selection.component.css']
})
export class PartnerSelectionComponent extends CookieComponent {
  protected readonly userCategories = userCategories;

  constructor(
    protected override cookieService: CookieService,
    protected override router: Router, protected override route: ActivatedRoute) {
    super();
  }

  userOnSelected(userCategory: UserCategory) {
    this.setCurrentUserCategory(userCategory);
    this.router.navigate(['/login'], {relativeTo: this.route}).then();
  }
}
