import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {LogoComponent} from "../../../logo/logo.component";
import {NgIf} from "@angular/common";
import {RegistrationType} from "../registration-type";
import {UserService} from "../../../../service/user/user.service";
import {CustomerService} from "../../../../service/user/customer.service";
import {BusinessService} from "../../../../service/user/business.service";
import {AdminService} from "../../../../service/user/admin.service";
import {DeliveryServiceService} from "../../../../service/user/delivery-service.service";
import {DeliveryPersonService} from "../../../../service/user/delivery-person.service";
import {CookieService} from "ngx-cookie-service";
import {EmailService} from "../../../../service/misc/email.service";
import {ActivatedRoute, Router} from "@angular/router";
import {InternalObjectService} from "../../../../service/misc/internal-object.service";
import {User} from "../../../../model/user/user";
import bcrypt from "bcryptjs";
import {HttpErrorResponse} from "@angular/common/http";
import {Customer} from "../../../../model/user/customer";
import {Business} from "../../../../model/user/business";
import {DeliveryService} from "../../../../model/user/delivery.service";
import {AuthenticationComponent} from "../../authentication-component";
import {UserType} from "../../../../service/user/user.type";
import {
  adminCategory,
  businessCategory,
  customerCategory,
  deliveryPersonCategory,
  deliveryServiceCategory
} from "../../../../service/user/userCategories";
import {DeliveryPerson} from "../../../../model/user/delivery.person";
import {RECAPTCHA_SETTINGS, RecaptchaModule} from "ng-recaptcha";
import {environment} from "../../../../../environment/environment.prod";
import {EditingUserType} from "../../../misc/editing-user-type";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {CurrentUserService} from "../../../../service/user/current-user.service";
import {
  addressElement,
  emailElement,
  firstNameElement,
  lastNameElement,
  nameElement,
  phoneElement,
  usernameElement
} from "../../../misc/editable-element";
import {Admin} from "../../../../model/user/admin";

@Component({
  selector: 'app-register-element',
  standalone: true,
  imports: [
    FormsModule,
    LogoComponent,
    NgIf,
    RecaptchaModule,
    FaIconComponent
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS, useValue: {
        siteKey: environment.siteKey
      }
    }
  ],
  templateUrl: './register-element.component.html',
  styleUrl: './register-element.component.scss'
})
export class RegisterElementComponent extends AuthenticationComponent implements OnInit {
  // Elements
  firstNameElement = firstNameElement;
  lastNameElement = lastNameElement;
  nameElement = nameElement;
  usernameElement = usernameElement;
  addressElement = addressElement;
  phoneElement = phoneElement;
  emailElement = emailElement;

  faXmark = faXmark;

  // Form fields
  firstNameInput: string = "";
  lastNameInput: string = "";
  nameInput: string = "";
  emailInput: string = "";
  usernameInput: string = "";
  passwordInput: string = "";
  confirmPasswordInput: string = "";

  addressInput: string = "";
  phoneInput: string = "";

  // Logic Fields
  isEmailExists: boolean = false;
  isUserAdded: boolean = false;

  @Input() registrationType!: RegistrationType | undefined;
  @Input() userService!: UserService<any> | undefined;

  @Input() isModal: boolean = false
  @Output() onCloseModalEmitter = new EventEmitter<boolean>();
  @Output() onUserAddedEmitter = new EventEmitter<User>();

  @Input() deliveryServiceId!: number;

  constructor(protected override customerService: CustomerService,
              protected override businessService: BusinessService,
              protected override adminService: AdminService,
              protected override deliveryServiceService: DeliveryServiceService,
              protected override deliveryPersonService: DeliveryPersonService,
              protected override currentUserService: CurrentUserService,
              protected override cookieService: CookieService,
              protected override emailService: EmailService,
              protected override router: Router, protected override route: ActivatedRoute,
              private internalObjectService: InternalObjectService<{
                verificationCodeHash: string,
                user: User
              }>) {
    super();
  }

  ngOnInit(): void {
    this.initializeUserByToken().then();
  }

  override onSubmit() {
    new Promise<boolean>((resolve, reject) => {
      if (this.isFormValid()) {
        console.log("Form is valid")
        this.getUserByEmail(this.emailInput, this.userService!).then((user) => {
          this.isEmailExists = (user !== null) && (user !== undefined);
          // Generating hash from password with bcrypt (one of the packages that is used for hashing passwords)
          if (!this.isEmailExists) {
            bcrypt.hash(this.passwordInput, this.hashSalt, (err, hashPassword) => {
              let newUser: User | undefined = this.createNewUser(hashPassword);
              if (newUser == null) {
                console.log("Error, user is null");
                resolve(false);
              } else {
                if (this.isUserRegistration()) {
                  this.sendVerificationEmail(this.emailInput).then(verificationCodeHash => {
                    if (verificationCodeHash != null) {
                      // Adding the new user to the database
                      this.userService?.addEntity(newUser).subscribe({
                        next: (newUser: User) => {
                          if (newUser != null) {
                            console.log("User added: ", newUser);
                            this.internalObjectService.setObject({
                              verificationCodeHash: verificationCodeHash,
                              user: newUser
                            });
                            this.router.navigate(['/verify-email'], {relativeTo: this.route}).then();
                            resolve(true);
                          } else {
                            console.log("Error, user is null");
                            resolve(false);
                          }
                        },
                        error: (error: HttpErrorResponse) => {
                          console.log("Error in adding new user: ", error);
                          resolve(false);
                        }
                      });
                    } else {
                      resolve(false);
                    }
                  });
                } else if (this.isAdminRegistration()) {
                  this.userService?.addEntity(newUser).subscribe({
                    next: (newUser: User) => {
                      if (newUser != null) {
                        console.log("User added: ", newUser);
                        this.isUserAdded = true;
                        this.clearValues();
                        this.onUserAddedEmitter.emit(User.fromJson(newUser));
                        resolve(true);
                      } else {
                        console.log("Error, user is null");
                        this.isUserAdded = false;
                        resolve(false);
                      }
                    },
                    error: (error: HttpErrorResponse) => {
                      console.log("Error in adding new user: ", error);
                      this.isUserAdded = false;
                      resolve(false);
                    }
                  });
                } else {
                  resolve(false);
                }
              }
            });
          } else {
            console.log("Email already exists")
            resolve(false)
          }
        });
      } else {
        console.log("Form is invalid")
        resolve(false)
      }
    }).then(success => {
      if (!success) super.onSubmit();
    });
  }

  override isFormValid(): boolean {
    return this.isCaptchaValid() &&
      this.isNameValid() &&
      this.isFirstNameValid() &&
      this.isLastNameValid() &&
      this.isUsernameValid() &&
      this.isAddressValid() &&
      this.isPhoneValid() &&
      this.isEmailProper(this.emailInput) &&
      this.isPasswordsMatch() &&
      this.isPasswordProper(this.passwordInput);
  }

  isFirstNameInvalid(): boolean {
    return !this.isFirstNameValid() && this.isSubmitted;
  }

  isFirstNameValid(): boolean {
    return this.firstNameInput.length > 0 ||
      !this.isEditableElementRelevant(firstNameElement, this.registrationType?.userCategory!);
  }

  isLastNameInvalid(): boolean {
    return !this.isLastNameValid() && this.isSubmitted;
  }

  isLastNameValid(): boolean {
    return this.lastNameInput.length > 0 ||
      !this.isEditableElementRelevant(lastNameElement, this.registrationType?.userCategory!);
  }

  isNameInvalid(): boolean {
    return !this.isNameValid() && this.isSubmitted;
  }

  isNameValid(): boolean {
    return this.nameInput.length > 0 ||
      !this.isEditableElementRelevant(nameElement, this.registrationType?.userCategory!);
  }

  isEmailInvalid(): boolean {
    return !this.isEmailProper(this.emailInput) && this.isSubmitted;
  }

  isUsernameInvalid(): boolean {
    return !this.isUsernameValid() && this.isSubmitted;
  }

  isUsernameValid(): boolean {
    return this.usernameInput.length > 0 ||
      !this.isEditableElementRelevant(usernameElement, this.registrationType?.userCategory!);
  }

  isAddressInvalid() {
    return !this.isAddressValid() && this.isSubmitted;
  }

  isAddressValid() {
    return this.addressInput.length > 0 ||
      !this.isEditableElementRelevant(addressElement, this.registrationType?.userCategory!);
  }

  isPhoneInvalid() {
    return !this.isPhoneValid() && this.isSubmitted;
  }

  isPhoneValid() {
    return this.phoneInput.length > 0 ||
      !this.isEditableElementRelevant(phoneElement, this.registrationType?.userCategory!);
  }

  isPasswordInvalid(): boolean {
    return !(this.isPasswordProper(this.passwordInput)) && this.isSubmitted;
  }

  isPasswordsNotMatch(): boolean {
    return !this.isPasswordsMatch() && this.isSubmitted;
  }

  isPasswordsMatch(): boolean {
    return this.passwordInput === this.confirmPasswordInput;
  }

  isAdminRegistration(): boolean {
    return this.registrationType?.editingUserType === EditingUserType.ADMIN;
  }

  isUserRegistration(): boolean {
    return this.registrationType?.editingUserType === EditingUserType.USER;
  }

  isUserNotAdded(): boolean {
    return !this.isUserAdded && this.isSubmitted;
  }

  private createNewUser(hashPassword: string): User | undefined {
    if (this.isCustomerCategory()) {
      return new Customer(
        this.firstNameInput, this.lastNameInput, this.emailInput,
        this.usernameInput, hashPassword
      );
    } else if (this.isBusinessCategory()) {
      return new Business(
        this.nameInput, this.emailInput, this.usernameInput,
        hashPassword, this.addressInput, this.phoneInput
      );
    } else if (this.isDeliveryServiceCategory()) {
      return new DeliveryService(
        this.nameInput, this.emailInput, this.usernameInput, hashPassword
      );
    } else if (this.isAdminCategory()) {
      return new Admin (
        this.firstNameInput, this.lastNameInput, this.emailInput,
        this.usernameInput, hashPassword
      )
    } else if (this.isDeliveryPersonCategory() && this.currentUserService?.deliveryService != undefined) {
      return new DeliveryPerson(this.firstNameInput, this.lastNameInput,
        this.emailInput, this.usernameInput, hashPassword,
        this.currentUserService?.deliveryService.deliveryServiceId!);
    } else if (this.isDeliveryPersonCategory() && super.isAdminCategory() && this.deliveryServiceId != undefined) {
      return new DeliveryPerson(this.firstNameInput, this.lastNameInput,
        this.emailInput, this.usernameInput, hashPassword,
        this.deliveryServiceId);
    }
    return undefined;
  }

  override isPartnerType(): boolean {
    return this.registrationType?.userCategory.userType === UserType.PARTNER;
  }

  override isBusinessCategory() {
    return this.registrationType?.userCategory.name === businessCategory.name;
  }

  override isDeliveryServiceCategory() {
    return this.registrationType?.userCategory.name === deliveryServiceCategory.name;
  }

  override isAdminCategory() {
    return this.registrationType?.userCategory.name === adminCategory.name;
  }

  override isCustomerCategory() {
    return this.registrationType?.userCategory.name === customerCategory.name;
  }

  override isDeliveryPersonCategory() {
    return this.registrationType?.userCategory.name === deliveryPersonCategory.name;
  }

  override isCaptchaValid(): boolean {
    return super.isCaptchaValid() || this.isAdminRegistration();
  }

  closeModal() {
    this.onCloseModalEmitter.emit(false);
  }

  private clearValues() {
    this.isSubmitted = false;
    this.isEmailExists = false;

    this.firstNameInput = "";
    this.lastNameInput = "";
    this.nameInput = "";
    this.emailInput = "";
    this.usernameInput = "";
    this.passwordInput = "";
    this.confirmPasswordInput = "";
    this.addressInput = "";
    this.phoneInput = "";
  }
}
