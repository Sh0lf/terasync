import {Component} from '@angular/core';
import {customerCategory, userCategories, UserCategory} from "../../../service/user/userCategories";
import {NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {SessionStorageKeys} from "../../session-storage-keys";

@Component({
  selector: 'app-partner-selection',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './partner-selection.component.html',
  styleUrls: ['../commonCss/auth.styles.css', './partner-selection.component.css']
})
export class PartnerSelectionComponent {
  protected readonly userCategories = userCategories;

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  userOnSelected(userCategory: UserCategory) {
    sessionStorage.setItem(SessionStorageKeys.USER_CATEGORY, JSON.stringify(userCategory));
    this.router.navigate(['/login'], {relativeTo: this.route}).then();
  }

  protected readonly customerCategory = customerCategory;
}
