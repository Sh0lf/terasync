import {Component} from '@angular/core';
import {customerCategory, userCategories, UserCategory} from "../../../service/user/userCategories";
import {NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-partner-selection',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './user-selection.component.html',
  styleUrls: ['../commonCss/auth.styles.css', './user-selection.component.css']
})
export class UserSelectionComponent {
  protected readonly userCategories = userCategories;

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  userOnSelected(userCategory: UserCategory) {
    sessionStorage.setItem(UserCategory.name, JSON.stringify(userCategory));
    this.router.navigate(['/login'], {relativeTo: this.route}).then();
  }

  protected readonly customerCategory = customerCategory;
}
