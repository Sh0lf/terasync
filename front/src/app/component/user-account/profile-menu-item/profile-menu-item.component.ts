import {Component, Input, OnInit} from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {CookieComponent} from "../../misc/cookie-component";
import {ActivatedRoute, Router} from "@angular/router";
import {logout, ProfileMenuItem} from "./profile-menu-item";
import {NgIf} from "@angular/common";
import {CookieService} from "ngx-cookie-service";
import {CurrentUserService} from "../../../service/user/current-user.service";

@Component({
  selector: 'app-profile-menu-item',
  standalone: true,
  imports: [
    FaIconComponent,
    NgIf
  ],
  templateUrl: './profile-menu-item.component.html',
  styleUrl: './profile-menu-item.component.scss'
})
export class ProfileMenuItemComponent extends CookieComponent implements OnInit {
  @Input() profileMenuItem!: ProfileMenuItem;

  borderRadius: string = '0';
  isShown: boolean = false;
  hasBorderBottom: boolean = true;

  constructor(protected override currentUserService: CurrentUserService,
              protected override cookieService: CookieService,
              protected override router: Router,
              protected override route: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    if (this.profileMenuItem.isHeader) {
      this.borderRadius = '10px 10px 0 0';
    } else if (this.profileMenuItem.isFooter) {
      this.borderRadius = '0 0 10px 10px';
      this.hasBorderBottom = false;
    }

    this.isShown = this.profileMenuItem.allowedUserCategories.includes(this.getCurrentUserCategory());
  }

  onClick() {
    if (this.profileMenuItem == logout) {
      this.logoutOnClick();
    } else {
      this.routeTo(this.profileMenuItem.link)
    }
  }
}
