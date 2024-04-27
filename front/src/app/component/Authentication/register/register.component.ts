import {Component} from '@angular/core';
import {NgIf} from "@angular/common";
import {RECAPTCHA_SETTINGS, RecaptchaModule} from "ng-recaptcha";
import {environment} from "../../../../environment/environment.prod";
import {AuthenticationComponent} from "../authentication-component";
import {FormsModule} from "@angular/forms";
import {CustomerService} from "../../../service/user/customer.service";
import {Customer} from "../../../model/user/customer";
import bcrypt from "bcryptjs";
import {ActivatedRoute, Router} from "@angular/router";
import {EmailService} from "../../../service/misc/email.service";
import {InternalObjectService} from "../../../service/misc/internal-object.service";
import {LogoComponent} from "../../logo/logo.component";
import {HttpErrorResponse} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {User} from "../../../model/user/user";
import {businessCategory, customerCategory, deliveryServiceCategory} from "../../../service/user/userCategories";
import {Business} from "../../../model/user/business";
import {DeliveryService} from "../../../model/user/delivery.service";
import {BusinessService} from "../../../service/user/business.service";
import {AdminService} from "../../../service/user/admin.service";
import {DeliveryServiceService} from "../../../service/user/delivery-service.service";
import {DeliveryPersonService} from "../../../service/user/delivery-person.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    NgIf,
    RecaptchaModule,
    FormsModule,
    LogoComponent
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS, useValue: {
        siteKey: environment.siteKey
      }
    }
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../commonCss/auth.styles.scss', '../../main/main.component.scss']
})
export class RegisterComponent extends AuthenticationComponent {
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

  constructor(protected override customerService: CustomerService,
              protected override businessService: BusinessService,
              protected override adminService: AdminService,
              protected override deliveryServiceService: DeliveryServiceService,
              protected override deliveryPersonService: DeliveryPersonService,
              protected override cookieService: CookieService,
              protected override emailService: EmailService,
              protected override router: Router, protected override route: ActivatedRoute,
              private internalObjectService: InternalObjectService<{
                verificationCodeHash: string,
                user: User
              }>) {
    super();
  }

  override onSubmit() {
    new Promise<boolean>((resolve, reject) => {
      if (this.isFormValid()) {
        console.log("Form is valid")
        this.getUserByEmail(this.emailInput).then((user) => {
          this.isEmailExists = user != null;
          // Generating hash from password with bcrypt (one of the packages that is used for hashing passwords)
          bcrypt.hash(this.passwordInput, this.hashSalt, (err, hashPassword) => {
            let newUser: User | undefined = this.createNewUser(hashPassword);
            if(newUser == null) {
              console.log("Error, user is null");
              resolve(false);
              return;
            }

            this.sendVerificationEmail(this.emailInput).then(verificationCodeHash => {
              if (verificationCodeHash != null) {
                // Adding the new user to the database
                this.fetchUserService().addEntity(newUser).subscribe({
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
                      console.log("Error, customer is null");
                      resolve(false);
                    }
                  },
                  error: (error: HttpErrorResponse) => {
                    console.log("Error in adding new customer: ", error);
                    resolve(false);
                  }
                });
              } else {
                resolve(false);
              }
            });
          });
        });
      } else {
        console.log("Form is invalid")
        resolve(false)
      }
    }).then(success => {
      super.onSubmit();
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
      !this.isEmailExists &&
      this.isEmailProper(this.emailInput) &&
      this.isPasswordsMatch() &&
      this.isPasswordProper(this.passwordInput);
  }

  isFirstNameInvalid(): boolean {
    return !this.isFirstNameValid() && this.isSubmitted;
  }

  isFirstNameValid(): boolean {
    return this.firstNameInput.length > 0 || this.isPartnerType();
  }

  isLastNameInvalid(): boolean {
    return !this.isLastNameValid() && this.isSubmitted;
  }

  isLastNameValid(): boolean {
    return this.lastNameInput.length > 0 || this.isPartnerType();
  }

  isNameInvalid(): boolean {
    return !this.isNameValid() && this.isSubmitted;
  }

  isNameValid(): boolean {
    return this.nameInput.length > 0 || !this.isPartnerType();
  }

  isEmailInvalid(): boolean {
    return !this.isEmailProper(this.emailInput) && this.isSubmitted;
  }

  isUsernameInvalid(): boolean {
    return !this.isUsernameValid() && this.isSubmitted;
  }

  isUsernameValid(): boolean {
    return this.usernameInput.length > 0;
  }

  isAddressInvalid() {
    return !this.isAddressValid() && this.isSubmitted;
  }

  isAddressValid() {
    return this.addressInput.length > 0 || !this.isBusinessCategory();
  }

  isPhoneInvalid() {
    return !this.isPhoneValid() && this.isSubmitted;
  }

  isPhoneValid() {
    return this.phoneInput.length > 0 || !this.isBusinessCategory();
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


  private createNewUser(hashPassword: string): User | undefined {
    if(this.isCustomerCategory()) {
      return new Customer(
        this.firstNameInput, this.lastNameInput, this.emailInput,
        this.usernameInput, hashPassword
      );
    } else if(this.isBusinessCategory()) {
      return new Business(
        this.nameInput, this.emailInput, this.usernameInput,
        hashPassword, this.addressInput, this.phoneInput
      );
    } else if(this.isDeliveryServiceCategory()) {
      return new DeliveryService(
        this.nameInput, this.emailInput, this.usernameInput, hashPassword
      );
    }
    return undefined;
  }
}
