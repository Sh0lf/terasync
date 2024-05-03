import {Component, OnInit} from '@angular/core';
import {CookieComponent} from "../misc/cookie-component";
import {businessCategory} from "../../service/user/userCategories";
import {faBowlFood, faBurger, faPlus} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {NgForOf} from "@angular/common";
import {ProductElementComponent} from "../manage-products/product-element/product-element.component";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-manage-menus',
  standalone: true,
  imports: [
    FaIconComponent,
    NgForOf,
    ProductElementComponent,
    ReactiveFormsModule
  ],
  templateUrl: './manage-menus.component.html',
  styleUrl: './manage-menus.component.scss'
})
export class ManageMenusComponent extends CookieComponent implements OnInit {
  faBowlFood = faBowlFood;


  constructor() {
    super();
  }

  ngOnInit(): void {
    this.initializeUserByToken().then(() => {
      this.specificUserPage(businessCategory)
    })
  }
}
