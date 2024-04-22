import {Component} from '@angular/core';
import {NgIf} from "@angular/common";
import {RECAPTCHA_SETTINGS, RecaptchaModule} from "ng-recaptcha";
import {environment} from "../../../../environment/environment.prod";
import {AuthenticationComponent} from "../authentication-component";
import {FormsModule} from "@angular/forms";
import {CustomerService} from "../../../service/user/customer.service";
import {Customer} from "../../../model/user/customer";
import {HttpErrorResponse} from "@angular/common/http";
import bcrypt from "bcryptjs";
import {ActivatedRoute, Router} from "@angular/router";
import {EmailService} from "../../../service/email.service";
import {Email} from "../../../model/email";
import {InternalObjectService} from "../../../service/internal-object.service";
import {LogoComponent} from "../../logo/logo.component";
import {checkEmail} from "../../functions";

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
  protected firstNameInput: string = "";
  protected lastNameInput: string = "";
  protected emailInput: string = "";
  protected usernameInput: string = "";
  protected passwordInput: string = "";
  protected confirmPasswordInput: string = "";

  // Logic Fields
  protected isEmailExists: boolean = false;

  constructor(private customerService: CustomerService,
              private internalObjectService: InternalObjectService<{
                verificationCodeHash: string,
                customer: Customer
              }>,
              private emailService: EmailService,
              private router: Router, private route: ActivatedRoute) {
    super();
  }

  override onSubmit() {
    new Promise<boolean>((resolve, reject) => {
      checkEmail(this.emailInput, this.customerService).then((isEmailExists) => {
        this.isEmailExists = isEmailExists;
        if (this.isFormValid()) {
          // Generating hash from password with bcrypt (one of the packages that is used for hashing passwords)
          bcrypt.hash(this.passwordInput, 10, (err, hash) => {
            let newCustomer = new Customer(
              this.firstNameInput, this.lastNameInput, this.emailInput,
              this.usernameInput, hash
            );
            // Generating random number for the verification code
            let code = Math.floor(Math.random() * 100000);
            console.log("Code: ", code);
            // Creating another hash for the verification code
            bcrypt.hash(String(code), 5, (err, hash) => {
              let email: Email = Email.verificationEmail(this.emailInput, code);
              console.log("Email: ", email);
              this.emailService.sendEmail(email).subscribe({
                next: (success: boolean) => {
                  if (success) {
                    // Adding the new customer to the database
                    this.customerService.addEntity(newCustomer).subscribe({
                      next: (newCustomer: Customer) => {
                        if (newCustomer != null) {
                          console.log("Customer added: ", newCustomer);
                          this.internalObjectService.setObject({verificationCodeHash: hash, customer: newCustomer});
                          this.router.navigate(['/register-success'], {relativeTo: this.route}).then();
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
                    console.log("Error, email not sent");
                    resolve(false);
                  }
                },
                error: (error: HttpErrorResponse) => {
                  console.log("Error in sending email: ", error);
                  resolve(false);
                }
              })
            });
          });
        } else {
          resolve(false)
        }
      });
    }).then(success => {
      super.onSubmit();
    });
  }

  override isFormValid(): boolean {
    return this.isCaptchaValid() &&
      this.isEmailProper(this.emailInput) &&
      this.isPasswordsMatch() &&
      this.isPasswordProper(this.passwordInput);
  }

  isFirstNameInvalid(): boolean {
    return !this.isFirstNameValid() && this.isSubmitted;
  }

  isFirstNameValid(): boolean {
    return this.firstNameInput.length > 0;
  }

  isLastNameInvalid(): boolean {
    return !this.isLastNameValid() && this.isSubmitted;
  }

  isLastNameValid(): boolean {
    return this.lastNameInput.length > 0;
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

  isPasswordInvalid(): boolean {
    return !(this.isPasswordProper(this.passwordInput)) && this.isSubmitted;
  }

  isPasswordsNotMatch(): boolean {
    return !this.isPasswordsMatch() && this.isSubmitted;
  }

  isPasswordsMatch(): boolean {
    return this.passwordInput === this.confirmPasswordInput;
  }
}
