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
import {LogoComponent} from "../../logo/logo.component";
import {EmailService} from "../../../service/misc/email.service";
import {InternalObjectService} from "../../../service/misc/internal-object.service";
import {CookieService} from "ngx-cookie-service";
import {Business} from "../../../model/user/business";
import {FooterComponent} from "../../footer/footer.component";
import {NgxResizeObserverModule} from "ngx-resize-observer";
import {CurrentUserService} from "../../../service/user/current-user.service";

// @ts-ignore
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterOutlet,
    NgForOf, HttpClientModule,
    FormsModule,
    RecaptchaModule, NgIf, LogoComponent, FooterComponent, NgxResizeObserverModule
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS, useValue: {
        siteKey: environment.siteKey
      }
    }
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../auth.styles.scss', '../../main/main.component.scss']
})
export class LoginComponent extends AuthenticationComponent implements OnInit {
  // Form fields
  emailInput: string = "";
  passwordInput: string = "";

  // Logic Fields
  isLoginValid: boolean = false;
  isLoginChecked: boolean = false;
  isEmailVerified: boolean = false;
  isApproved: boolean = false;

  constructor(protected override customerService: CustomerService,
              protected override businessService: BusinessService,
              protected override adminService: AdminService,
              protected override deliveryServiceService: DeliveryServiceService,
              protected override deliveryPersonService: DeliveryPersonService,
              protected override cookieService: CookieService,
              protected override emailService: EmailService,
              protected override currentUserService: CurrentUserService,
              protected override router: Router, protected override route: ActivatedRoute,
              private internalObjectService: InternalObjectService<{
                verificationCodeHash: string,
                user: User
              }>) {
    super();
  }

  ngOnInit(): void {
    if (this.hasUserToken()) {
      this.deleteUserToken();
    }
  }

  override onSubmit() {
    new Promise<boolean>((resolve, reject) => {
      if (this.isFormValid()) {
        this.fetchUserService().findUserByEmail(this.emailInput).subscribe({
          next: (jsonUser: User) => {
            if (jsonUser != null) {
              bcrypt.compare(this.passwordInput, jsonUser.password).then(success => {
                if (success) {
                  this.isUserEmailVerified(jsonUser).then((isEmailVerified) => {
                    this.isEmailVerified = isEmailVerified;
                    this.isUserApproved(jsonUser).then((isApproved) => {
                      this.isApproved = isApproved;
                      if (isApproved) {
                        console.log('User is approved');
                        this.resetTokenByEmail(jsonUser.email).then((success) => {
                          resolve(success);
                          if (success) {
                            this.initializeUser(jsonUser);
                          }
                        });
                      } else {
                        console.log('User is not approved');
                        resolve(false);
                      }
                    });
                  });
                  this.isLoginValid = true;
                  console.log('Login is valid');
                } else {
                  console.log('Login is invalid');
                  resolve(false);
                }
                this.isLoginChecked = true;
              });
            } else {
              console.log('Json User is null');
              this.isLoginChecked = true;
              resolve(false);
            }
          },
          error: (error: HttpErrorResponse) => {
            console.log('Login is invalid, HTTP ERROR');
            resolve(false);
          }
        });
      } else {
        console.log('Form is invalid');
        resolve(false);
      }
    }).then(success => {
      super.onSubmit();

      if (success && this.isLoginValid && this.isEmailVerified && this.isApproved) {
        this.routeToHome().then();
      }
    });
  }

  override isFormValid(): boolean {
    return this.isEmailValid() &&
      this.isPasswordValid() &&
      this.isCaptchaValid();
  }

  isEmailInvalid(): boolean {
    return !this.isEmailValid() && this.isSubmitted;
  }

  isEmailValid(): boolean {
    return this.isEmailProper(this.emailInput) && this.emailInput.length > 0;
  }

  isPasswordInvalid(): boolean {
    return !this.isPasswordValid() && this.isSubmitted;
  }

  isPasswordValid(): boolean {
    return this.passwordInput.length > 0;
  }

  isLoginInvalid(): boolean {
    return !this.isLoginValid && this.isLoginChecked && this.isSubmitted;
  }

  isUserNotApproved(): boolean {
    return !this.isApproved && this.isLoginValid && this.isEmailVerified;
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

  private isUserEmailVerified(jsonUser: User): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      if (!jsonUser.emailVerified) {
        console.log('Email not verified');
        this.sendVerificationEmail(jsonUser.email).then((verificationCodeHash) => {
          if (verificationCodeHash != null) {
            this.internalObjectService.setObject({
              verificationCodeHash: verificationCodeHash,
              user: jsonUser
            });
            this.router.navigate(['/verify-email'], {relativeTo: this.route}).then();
          }
        });
        resolve(false);
      } else {
        resolve(true);
      }
    });
  }

  private isUserApproved(jsonUser: User): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      if (this.isBusinessCategory()) {
        resolve((jsonUser as Business).approved!)
      } else if (this.isDeliveryServiceCategory()) {
        resolve((jsonUser as Business).approved!)
      } else {
        resolve(true);
      }
    });
  }
}
