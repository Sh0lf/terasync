import {Component, OnChanges, SimpleChanges} from '@angular/core';
import {NgIf} from "@angular/common";
import {RECAPTCHA_SETTINGS, RecaptchaModule} from "ng-recaptcha";
import {environment} from "../../../../environment/environment.prod";
import {Authentication} from "../authentication";
import {FormsModule} from "@angular/forms";
import {CustomerService} from "../../../service/user/customer.service";
import {Customer} from "../../../model/user/customer";
import {HttpErrorResponse} from "@angular/common/http";
import bcrypt from "bcryptjs";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    NgIf,
    RecaptchaModule,
    FormsModule
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS, useValue: {
        siteKey: environment.siteKey
      }
    }
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../commonCss/auth.styles.css', '../../main/main.component.scss']
})
export class RegisterComponent extends Authentication implements OnChanges {
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
              private router: Router, private route: ActivatedRoute) {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("Changes: ", changes)
    if (changes["inputEmail"]) {
      console.log("Email changed");
    }
  }

  override onSubmit() {
    super.onSubmit();
    this.checkEmail().then(() => {
      if (this.isFormValid()) {
        // Generating hash from password with bcrypt (one of the packages that is used for hashing passwords)
        bcrypt.hash(this.passwordInput, 10, (err, hash) => {
          let newCustomer = new Customer(
            this.firstNameInput, this.lastNameInput, this.emailInput,
            this.usernameInput, hash
          );
          this.customerService.addEntity(newCustomer).subscribe({
            next: (customer: Customer) => {
              this.router.navigate(['/register-success'], {relativeTo: this.route}).then();
            },
            error: (error: HttpErrorResponse) => {
              console.log("Error: ", error);
            }
          });
        });
      }
    });
  }

  override isFormValid(): boolean {
    return !this.isCaptchaInvalid() && !this.isEmailExists && !this.isPasswordsNotMatch()
  }

  isFirstNameInvalid(): boolean {
    return !(this.firstNameInput.length > 0) && this.isSubmitted;
  }

  isLastNameInvalid(): boolean {
    return !(this.lastNameInput.length > 0) && this.isSubmitted;
  }

  isEmailInvalid(): boolean {
    return !(this.isEmailProper(this.emailInput) && this.emailInput.length > 0) && this.isSubmitted;
  }

  checkEmail(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.customerService.findUserByEmail(this.emailInput).subscribe({
        next: (customer: Customer) => {
          this.isEmailExists = customer != null;
          resolve(true);
        },
        error: (error: HttpErrorResponse) => {
          this.isEmailExists = false;
          reject(false);
        }
      });
    });
  }

  isUsernameInvalid(): boolean {
    return !(this.usernameInput.length > 0) && this.isSubmitted;
  }

  isPasswordInvalid(): boolean {
    return !(this.passwordInput.length > 0) && this.isSubmitted;
  }

  isPasswordDirty(): boolean {
    return !(this.isPasswordProper(this.passwordInput)) && this.isSubmitted;
  }

  isConfirmPasswordInvalid(): boolean {
    return !(this.confirmPasswordInput.length > 0) && this.isSubmitted;
  }

  isPasswordsNotMatch(): boolean {
    return !(this.passwordInput === this.confirmPasswordInput) && this.isSubmitted;
  }
}
