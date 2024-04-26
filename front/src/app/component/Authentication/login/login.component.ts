import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterOutlet} from '@angular/router';
import {HttpClientModule, HttpErrorResponse} from "@angular/common/http";
import {NgForOf, NgIf} from "@angular/common";
import {RECAPTCHA_SETTINGS, RecaptchaModule} from "ng-recaptcha";
import {FormsModule} from "@angular/forms";
import {environment} from "../../../../environment/environment.prod";
import {CustomerService} from "../../../service/user/customer.service";
import {customerCategory} from "../../../service/user/userCategories";
import {UserType} from "../../../service/user/user.type";
import {BusinessService} from "../../../service/user/business.service";
import {AdminService} from "../../../service/user/admin.service";
import {DeliveryServiceService} from "../../../service/user/delivery-service.service";
import {DeliveryPersonService} from "../../../service/user/delivery-person.service";
import {User} from "../../../model/user/user";
import {AuthenticationComponent} from "../authentication-component";
import bcrypt from "bcryptjs";
import {Customer} from "../../../model/user/customer";
import {LogoComponent} from "../../logo/logo.component";
import {EmailService} from "../../../service/misc/email.service";
import {InternalObjectService} from "../../../service/internal-object.service";
import {CookieService} from "ngx-cookie-service";

// @ts-ignore
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterOutlet,
    NgForOf, HttpClientModule,
    FormsModule,
    RecaptchaModule, NgIf, LogoComponent
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS, useValue: {
        siteKey: environment.siteKey
      }
    }
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../commonCss/auth.styles.scss', '../../main/main.component.scss']
})
export class LoginComponent extends AuthenticationComponent implements OnInit {
  // Form fields
  protected emailInput: string = "";
  protected passwordInput: string = "";

  // Logic Fields
  protected isLoginValid: boolean = false;

  constructor(protected override customerService: CustomerService,
              protected override businessService: BusinessService,
              protected override adminService: AdminService,
              protected override deliveryServiceService: DeliveryServiceService,
              protected override deliveryPersonService: DeliveryPersonService,
              protected override cookieService: CookieService,
              protected override emailService: EmailService,
              private internalObjectService: InternalObjectService<{
                verificationCodeHash: string,
                customer: Customer
              }>,
              private router: Router, private route: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    if(this.hasUserToken()) {
      this.deleteUserToken();
    }
  }

  override onSubmit() {
    new Promise<boolean>((resolve, reject) => {
      if (this.isFormValid()) {
        this.fetchService().findUserByEmail(this.emailInput).subscribe({
          next: (jsonUser: User) => {
            if (jsonUser != null) {
              bcrypt.compare(this.passwordInput, jsonUser.password).then(success => {
                if (success) {
                  if (!this.checkCustomerEmailVerified(jsonUser)) {
                    resolve(true);
                  } else {
                    this.resetTokenByEmail(jsonUser.email).then((success) => {
                      resolve(success);
                    });
                    console.log('Login is valid');
                  }
                } else {
                  console.log('Login is invalid');
                  resolve(false);
                }
              });
            } else {
              console.log('Json User is null');
              resolve(false);
            }
          },
          error: (error: HttpErrorResponse) => {
            console.log('Login is invalid, HTTP ERROR');
            resolve(false);
          }
        });
      } else {
        console.log('Login is invalid');
        resolve(false);
      }
    }).then(success => {
      this.isLoginValid = success;
      super.onSubmit();

      console.log("submitted: " + this.isSubmitted);
      console.log("isLoginValid: " + this.isLoginValid)

      if (this.isLoginValid) {
        this.routeToHome(this.router, this.route);
      }
    });
  }

  override isFormValid(): boolean {
    return !this.isEmailInvalid() && !this.isPasswordInvalid() && !this.isCaptchaInvalid();
  }

  isEmailInvalid(): boolean {
    return !(this.isEmailProper(this.emailInput) && this.emailInput.length > 0) && this.isSubmitted;
  }

  isPasswordInvalid(): boolean {
    return !(this.passwordInput.length > 0) && this.isSubmitted;
  }

  isLoginInvalid(): boolean {
    return !(this.isLoginValid) && this.isSubmitted;
  }

  getOppositeUserType(): UserType {
    return this.isPartnerType() ? UserType.CUSTOMER : UserType.PARTNER;
  }

  switchUserType() {
    if (this.isPartnerType()) {
      this.setCurrentUserCategory(customerCategory);
    } else {
      this.router.navigate(['/partner-selection'], {relativeTo: this.route}).then();
    }
  }

  private checkCustomerEmailVerified(jsonUser: User): boolean {
    if (this.getCurrentUserCategory().userType == UserType.CUSTOMER && !(jsonUser as Customer).emailVerified) {
      console.log('Email not verified');
      this.sendVerificationEmail(jsonUser.email).then((verificationCodeHash) => {
        if (verificationCodeHash != null) {
          this.internalObjectService.setObject({
            verificationCodeHash: verificationCodeHash,
            customer: jsonUser as Customer
          });
          this.router.navigate(['/verify-email'], {relativeTo: this.route}).then();
        }
      });
      return false;
    } else {
      return true;
    }
  }
}
