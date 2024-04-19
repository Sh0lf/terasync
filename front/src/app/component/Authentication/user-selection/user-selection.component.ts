import {Component} from '@angular/core';
import {userCategories, UserCategory} from "../../../service/user/userCategories";
import {NgForOf} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-partner-selection',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './user-selection.component.html',
  styleUrls: ['../commonCss/auth.styles.css', './user-selection.component.css']
})
export class UserSelectionComponent {
  protected readonly userCategories = userCategories;

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  userOnSelected(userCategory: UserCategory) {
    // console.log(userCategory.name)
    sessionStorage.setItem(UserCategory.name, JSON.stringify(userCategory));
    this.router.navigate(['/login'], {relativeTo: this.route}).then(hasRouted => {
      console.log('Has routed ' + hasRouted + ' to login page.');
    })
  }
}
