import {Component, OnInit} from '@angular/core';
import {
  addressElement,
  EditableElement,
  editableElements,
  emailElement,
  firstNameElement,
  lastNameElement,
  nameElement,
  passwordElement,
  phoneElement,
  usernameElement
} from "./cs-elem/editable-element";
import {NgForOf, NgIf} from "@angular/common";
import {CsElemComponent} from "./cs-elem/cs-elem.component";
import {FooterComponent} from "../footer/footer.component";
import {CookieComponent} from "../misc/cookie-component";
import {CookieService} from "ngx-cookie-service";
import {CurrentUserService} from "../../service/user/current-user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../model/user/user";
import {CustomerService} from "../../service/user/customer.service";
import {BusinessService} from "../../service/user/business.service";
import {AdminService} from "../../service/user/admin.service";
import {DeliveryServiceService} from "../../service/user/delivery-service.service";
import {DeliveryPersonService} from "../../service/user/delivery-person.service";
import {NgxResizeObserverModule} from "ngx-resize-observer";

@Component({
  selector: 'app-connection-security',
  standalone: true,
  imports: [
    NgForOf,
    CsElemComponent,
    FooterComponent,
    NgIf,
    NgxResizeObserverModule
  ],
  templateUrl: './connection-security.component.html',
  styleUrl: './connection-security.component.scss'
})
export class ConnectionSecurityComponent extends CookieComponent implements OnInit {
  protected readonly editableElements = editableElements;

  constructor(protected override customerService: CustomerService,
              protected override businessService: BusinessService,
              protected override adminService: AdminService,
              protected override deliveryServiceService: DeliveryServiceService,
              protected override deliveryPersonService: DeliveryPersonService,
              protected override currentUserService: CurrentUserService,
              protected override cookieService: CookieService,
              protected override router: Router, protected override route: ActivatedRoute,) {
    super();
  }

  ngOnInit(): void {
    this.initializeUserByToken().then(() => {
      this.loggedInPage();
      this.setEditableElementValues();
    });
  }

  private setEditableElementValues() {
    this.editableElements.forEach((editableElement) => {
      if (this.isEditableElementRelevant(editableElement)) {
        switch (editableElement.name) {
          case nameElement.name:
            editableElement.value = this.currentUserService.user?.name!;
            break;
          case firstNameElement.name:
            editableElement.value = this.currentUserService.user?.firstName!;
            break;
          case lastNameElement.name:
            editableElement.value = this.currentUserService.user?.lastName!;
            break;
          case usernameElement.name:
            editableElement.value = this.currentUserService.user?.username!;
            break;
          case phoneElement.name:
            editableElement.value = this.currentUserService.user?.phone!;
            break;
          case addressElement.name:
            editableElement.value = this.currentUserService.user?.address!;
            break;
          case emailElement.name:
            editableElement.value = this.currentUserService.user?.email!;
            break;
          case passwordElement.name:
            editableElement.value = this.currentUserService.user?.password!;
            break;
        }
      }
    });
  }

  private setUserFields() {
    this.editableElements.forEach((editableElement) => {
      if (this.isEditableElementRelevant(editableElement)) {
        switch (editableElement.name) {
          case nameElement.name:
            this.currentUserService.user?.setName(editableElement.value);
            break;
          case firstNameElement.name:
            this.currentUserService.user?.setFirstName(editableElement.value);
            break;
          case lastNameElement.name:
            this.currentUserService.user?.setLastName(editableElement.value);
            break;
          case usernameElement.name:
            this.currentUserService.user?.setUsername(editableElement.value);
            break;
          case phoneElement.name:
            this.currentUserService.user?.setPhone(editableElement.value);
            break;
          case addressElement.name:
            this.currentUserService.user?.setAddress(editableElement.value);
            break;
          case emailElement.name:
            this.currentUserService.user?.setEmail(editableElement.value);
            break;
          case passwordElement.name:
            this.currentUserService.user?.setPassword(editableElement.value);
            break;
        }
      }
    });
  }

  onApplyChanges() {
    this.setUserFields();
    this.fetchUserService().updateEntity(this.currentUserService.user).subscribe({
      next: (jsonUser: User) => {
        console.log("Updated user.")
        this.initializeUser(jsonUser);
      },
      error: (error) => {
        console.log("HTTP ERROR: Failed to update user.");
      }
    });
  }

  isEditableElementRelevant(editableElement: EditableElement): boolean {
    return editableElement.userCategories.includes(this.getCurrentUserCategory());
  }
}
