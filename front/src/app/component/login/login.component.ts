import {Component, forwardRef, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HttpClientModule, HttpErrorResponse} from "@angular/common/http";
import {NgForOf, NgIf} from "@angular/common";
import {RECAPTCHA_SETTINGS, RecaptchaModule} from "ng-recaptcha";
import {FormsModule} from "@angular/forms";
import {environment} from "../../../environment/environment.prod";
import {Customer} from "../../model/user/customer";
import {CustomerService} from "../../service/user/customer.service";

// @ts-ignore
@Component({
  selector: 'login-component',
  standalone: true,
  imports: [
    RouterOutlet,
    NgForOf, HttpClientModule,
    FormsModule,
    RecaptchaModule, NgIf
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS, useValue: {
        siteKey: environment.siteKey
      }
    }
  ],
  templateUrl: './login.component.html',
  styleUrls: ['../commonCss/auth.styles.css', '../main/main.component.scss']
})
export class LoginComponent {
  protected lgEmail: string = "";
  protected lgPassword: string = "";
  protected captcha: string | null = "";
  protected submitted: boolean = false;
  protected loginValid: boolean = false;

  // public customers: Customer[] =[];

  constructor(private customerService: CustomerService
  ) {

  }
  resolved(captchaResponse: string | null) {
    this.captcha = captchaResponse;
  }

  onSubmit() {
    this.submitted = true;
    console.log('is valid: ' + this.isCaptchaInvalid());
    console.log('Email: ' + this.lgEmail);
    console.log('Password: ' + this.lgPassword);
    console.log('Captcha: ' + this.captcha);

    if(this.isFormValid()) {
      this.customerService.findCustomerByEmail(this.lgEmail).subscribe({
        next: (customer: Customer) => {
          this.loginValid = customer.password === this.lgPassword;
        },
        error: (error: HttpErrorResponse) => {
          console.error(error);
        }
      });
    }
  }

  isEmailInvalid(): boolean {
    let regex = new RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$");
    return !(regex.test(this.lgEmail) && this.lgEmail != null && this.lgEmail.length > 0) && this.submitted;
  }

  isPasswordInvalid(): boolean {
    return !(this.lgPassword != null && this.lgPassword.length > 0) && this.submitted;
  }

  isCaptchaInvalid(): boolean {
    return !(this.captcha != null && this.captcha.length > 0) && this.submitted;
  }

  isFormValid(): boolean {
    return !this.isEmailInvalid() && !this.isPasswordInvalid() && !this.isCaptchaInvalid();
  }

  isLoginInvalid(): boolean {
    return !(this.loginValid) && this.submitted;
  }
}
