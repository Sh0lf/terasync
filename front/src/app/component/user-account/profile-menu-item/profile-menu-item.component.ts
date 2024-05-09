import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {CookieComponent} from "../../misc/cookie-component";
import {ActivatedRoute, Router} from "@angular/router";
import {logout, ProfileMenuItem, profileMenuItems} from "./profile-menu-item";
import {NgIf} from "@angular/common";
import {CookieService} from "ngx-cookie-service";
import {CurrentUserService} from "../../../service/user/current-user.service";
import {ManageUsersService} from "../../../service/misc/manage-users.service";
import {DeliveryPersonService} from "../../../service/user/delivery-person.service";
import {DeliveryServiceService} from "../../../service/user/delivery-service.service";
import {AdminService} from "../../../service/user/admin.service";
import {BusinessService} from "../../../service/user/business.service";
import {CustomerService} from "../../../service/user/customer.service";
import {EditableElement, editableElements, passwordElement, usernameElement} from "../../misc/editable-element";
import {UserCategory} from "../../../service/user/userCategories";

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
  @Output() clickedOnEmitter = new EventEmitter<ProfileMenuItem>();

  borderRadius: string = '0';
  isShown: boolean = false;
  hasBorderBottom: boolean = true;

  constructor(private manageUsersService: ManageUsersService,
              protected override currentUserService: CurrentUserService,
              protected override customerService: CustomerService,
              protected override businessService: BusinessService,
              protected override adminService: AdminService,
              protected override deliveryServiceService: DeliveryServiceService,
              protected override deliveryPersonService: DeliveryPersonService,
              protected override cookieService: CookieService,
              protected override router: Router,
              protected override route: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    if (profileMenuItems.indexOf(this.profileMenuItem) == 0) {
      this.borderRadius = '10px 10px 0 0';
    } else if (profileMenuItems.indexOf(this.profileMenuItem) == profileMenuItems.length - 1) {
      this.borderRadius = '0 0 10px 10px';
      this.hasBorderBottom = false;
    }

    this.isShown = this.profileMenuItem.allowedUserCategories.includes(this.getCurrentUserCategory());
  }

  onClick() {
    if(this.profileMenuItem.editingUserCategory !== undefined && this.profileMenuItem.registrationType !== undefined) {
      this.manageUsersService.editingUserCategory = this.profileMenuItem.editingUserCategory!;
      this.manageUsersService.registrationType = this.profileMenuItem.registrationType!;
      this.manageUsersService.editingUserService = this.fetchUserServiceByCategory(this.profileMenuItem.editingUserCategory!);
      this.manageUsersService.editableElements = this.getEditableElements(this.profileMenuItem.editingUserCategory!);
      this.manageUsersService.fieldFilter = usernameElement.name;
      this.manageUsersService.searchInput = '';
    }

    if (this.profileMenuItem == logout) {
      this.logoutOnClick();
    } else {
      this.routeTo(this.profileMenuItem.link)
    }
  }

  private getEditableElements(userCategory: UserCategory) {
    let editableElementsChosen: EditableElement[] = [];
    editableElements.forEach(element => {
      if (element.userCategories.includes(userCategory) &&
        element !== passwordElement) {
        editableElementsChosen.push(element);
      }
    });

    return editableElementsChosen;
  }
}
