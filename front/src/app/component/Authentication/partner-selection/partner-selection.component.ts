import {Component} from '@angular/core';
import {customerCategory, userCategories, UserCategory} from "../../../service/user/userCategories";
import {NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {StorageKeys} from "../../misc/storage-keys";
import {LogoComponent} from "../../logo/logo.component";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-partner-selection',
  standalone: true,
  imports: [
    NgForOf,
    NgIf, LogoComponent
  ],
  templateUrl: './partner-selection.component.html',
  styleUrls: ['../commonCss/auth.styles.scss', './partner-selection.component.css']
})
export class PartnerSelectionComponent {
  protected readonly userCategories = userCategories;

  constructor(
    private cookieService: CookieService,
    private router: Router, private route: ActivatedRoute) {
  }

  userOnSelected(userCategory: UserCategory) {
    this.cookieService.set(StorageKeys.USER_CATEGORY, JSON.stringify(userCategory));
    this.router.navigate(['/login'], {relativeTo: this.route}).then();
  }

  protected readonly customerCategory = customerCategory;
}
