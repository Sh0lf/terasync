import {Component, Input, OnInit} from '@angular/core';
import {EditableElement} from "./editable-element";
import {CookieService} from "ngx-cookie-service";
import {NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {EditableElementType} from "./editable-element-type";
import {AuthenticationComponent} from "../../Authentication/authentication-component";
import bcrypt from "bcryptjs";
import {CurrentUserService} from "../../../service/user/current-user.service";

@Component({
  selector: 'app-cs-elem',
  standalone: true,
  imports: [
    NgIf,
    FormsModule
  ],
  templateUrl: './cs-elem.component.html',
  styleUrl: './cs-elem.component.scss'
})
export class CsElemComponent extends AuthenticationComponent {
  @Input() editableElement!: EditableElement;
  newValue: string = "";
  passwordConfirmation: string = "";
  oldPassword: string = "";

  isEditingField = false;
  isEditingPassword = false;

  isOldPasswordValid = false;
  isOldPasswordChecked = false;

  constructor(protected override currentUserService: CurrentUserService,
              protected override cookieService: CookieService) {
    super();
  }

  showElement(): boolean {
    return this.editableElement.userCategories.includes(this.getCurrentUserCategory())
  }

  setEditing(isEditing: boolean) {
    this.isEditingField = isEditing;
  }

  onConfirm() {
    if (this.isPasswordElement()) {
      this.isEditingPassword = true;
      if (this.isPasswordProper(this.newValue)) {
        if(!(this.newValue === this.passwordConfirmation)) {
          console.log("Passwords do not match.")
          return;
        }

        // COMPARE OLD PASSWORD WITH STORED HASH
        bcrypt.compare(this.oldPassword, this.currentUserService.user?.password!, (err, success) => {
          if (success) {
            // HASH NEW PASSWORD
            bcrypt.hash(this.newValue, this.hashSalt, (err, hash) => {
              if (err) {
                console.error(err);
                return;
              }
              console.log("Password changed.")
              this.editableElement.value = hash;
            });
          } else {
            this.isOldPasswordValid = false;
            this.isOldPasswordChecked = true;
            console.log("Old password is incorrect.")
            return;
          }
        });
      } else {
        console.log("Password is not proper.")
        return;
      }
    }
    else {
      if (this.isFieldProper(this.newValue)) {
        this.editableElement.value = this.newValue;
      } else {
        return;
      }
    }

    this.setEditing(false);
  }

  onEdit() {
    this.setEditing(true);

    if (!this.isPasswordElement()) {
      this.newValue = this.editableElement.value;
    } else {
      this.newValue = "";
    }
  }

  onCancel() {
    this.newValue = this.editableElement.value;
    this.setEditing(false);
  }

  getValue() {
    if (!this.isPasswordElement()) {
      return this.editableElement.value;
    } else {
      return "************";
    }
  }

  resetValues() {
    this.newValue = "";
    this.passwordConfirmation = "";
    this.oldPassword = "";

    this.isEditingField = false;
    this.isEditingPassword = false;

    this.isOldPasswordValid = false;
    this.isOldPasswordChecked = false;
  }


  isPasswordElement() {
    return this.editableElement.editableElementType === EditableElementType.PASSWORD;
  }

  isEditingPasswordElement() {
    return this.isPasswordElement() && this.isEditingField;
  }

  isFormValid(): boolean {
    return false;
  }

  isFieldInvalid() {
    return this.isEditingField && !this.isFieldProper(this.newValue) && !this.isPasswordElement();
  }

  isPasswordInvalid(): boolean {
    return this.isEditingPassword && !this.isPasswordProper(this.newValue) && this.isPasswordElement();
  }

  isPasswordsNotMatch(): boolean {
    return this.isEditingPassword && this.newValue !== this.passwordConfirmation;
  }

  isOldPasswordInvalid() {
    return this.isEditingPassword && !this.isOldPasswordValid && this.isOldPasswordChecked;
  }
}
