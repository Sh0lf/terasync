import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  addressElement, EditableElement,
  editableElements, EditingUserType, emailElement,
  firstNameElement,
  lastNameElement,
  nameElement, passwordElement, phoneElement,
  usernameElement
} from "../connection-security-field/editable-element";
import {CsElemComponent} from "../connection-security-field/cs-elem.component";
import {NgForOf, NgIf} from "@angular/common";
import {FormComponent} from "../../../misc/form-component";
import {User} from "../../../../model/user/user";
import {CustomerService} from "../../../../service/user/customer.service";
import {BusinessService} from "../../../../service/user/business.service";
import {AdminService} from "../../../../service/user/admin.service";
import {DeliveryServiceService} from "../../../../service/user/delivery-service.service";
import {DeliveryPersonService} from "../../../../service/user/delivery-person.service";
import {CurrentUserService} from "../../../../service/user/current-user.service";
import {CookieService} from "ngx-cookie-service";
import {ActivatedRoute, Router} from "@angular/router";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {UserService} from "../../../../service/user/user.service";
import {UserCategory} from "../../../../service/user/userCategories";

@Component({
  selector: 'app-connection-security-element',
  standalone: true,
  imports: [
    CsElemComponent,
    NgForOf,
    NgIf,
    FaIconComponent
  ],
  templateUrl: './connection-security-element.component.html',
  styleUrl: './connection-security-element.component.scss'
})
export class ConnectionSecurityElementComponent extends FormComponent implements OnInit {
  faXmark = faXmark;

  editableElements = editableElements;
  changesSuccess: boolean = false;

  @Input() user!: User;
  @Input() userService!: UserService<any>
  @Input() userCategory!: UserCategory;

  @Input() isModal: boolean = false
  @Output() onCloseModal = new EventEmitter<boolean>();
  @Input() editingUserType: EditingUserType = EditingUserType.USER;

  constructor() {
    super();
  }

  ngOnInit(): void {
    if(this.user != undefined && this.userService != undefined && this.userCategory != undefined) {
      this.setEditableElementValues();
    } else {
      console.error("ERROR: User, UserService or UserCategory is undefined.")
    }
  }

  override isFormValid(): boolean {
    throw new Error('Method not implemented.');
  }

  private setEditableElementValues() {
    this.editableElements.forEach((editableElement) => {
      if (this.isEditableElementRelevant(editableElement)) {
        switch (editableElement.name) {
          case nameElement.name:
            editableElement.value = this.user?.name!;
            break;
          case firstNameElement.name:
            editableElement.value = this.user?.firstName!;
            break;
          case lastNameElement.name:
            editableElement.value = this.user?.lastName!;
            break;
          case usernameElement.name:
            editableElement.value = this.user?.username!;
            break;
          case phoneElement.name:
            editableElement.value = this.user?.phone!;
            break;
          case addressElement.name:
            editableElement.value = this.user?.address!;
            break;
          case emailElement.name:
            editableElement.value = this.user?.email!;
            break;
          case passwordElement.name:
            editableElement.value = this.user?.password!;
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
            this.user.setName(editableElement.value);
            break;
          case firstNameElement.name:
            this.user.setFirstName(editableElement.value);
            break;
          case lastNameElement.name:
            this.user.setLastName(editableElement.value);
            break;
          case usernameElement.name:
            this.user.setUsername(editableElement.value);
            break;
          case phoneElement.name:
            this.user.setPhone(editableElement.value);
            break;
          case addressElement.name:
            this.user.setAddress(editableElement.value);
            break;
          case emailElement.name:
            this.user.setEmail(editableElement.value);
            break;
          case passwordElement.name:
            this.user.setPassword(editableElement.value);
            break;
        }
      }
    });
  }

  onApplyChanges() {
    this.setUserFields();
    let user: User = User.fromJson(this.user)
    user.clearLists();

    this.userService.updateEntity(user).subscribe({
      next: (jsonUser: User) => {
        console.log("Updated user.")
        this.changesSuccess = true;
      },
      error: (error) => {
        this.changesSuccess = false;
        console.log("HTTP ERROR: Failed to update user.");
      },
      complete: () => {
        super.onSubmit();
      }
    });
  }

  onCancel() {
    this.setEditableElementValues();
    this.isSubmitted = false;
  }

  isEditableElementRelevant(editableElement: EditableElement): boolean {
    return editableElement.userCategories.includes(this.userCategory);
  }

  isNotSuccess() {
    return !this.changesSuccess && this.isSubmitted;
  }

  isSuccess() {
    return this.changesSuccess && this.isSubmitted;
  }

  closeModal() {
    this.onCloseModal.emit(false);
  }
}
