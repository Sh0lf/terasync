import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {AuthenticationComponent} from "../authentication-component";
import {NgIf} from "@angular/common";
import {RECAPTCHA_SETTINGS, RecaptchaModule} from "ng-recaptcha";
import {environment} from "../../../../environment/environment.prod";
import {LogoComponent} from "../../logo/logo.component";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../service/user/user.service";
import {
  adminCategory,
  businessCategory,
  customerCategory,
  deliveryPersonCategory,
  deliveryServiceCategory
} from "../../../service/user/userCategories";
import {CustomerService} from "../../../service/user/customer.service";
import {BusinessService} from "../../../service/user/business.service";
import {AdminService} from "../../../service/user/admin.service";
import {DeliveryServiceService} from "../../../service/user/delivery-service.service";
import {DeliveryPersonService} from "../../../service/user/delivery-person.service";
import {EmailService} from "../../../service/email.service";
import {StorageKeys} from "../../misc/storage-keys";
import bcrypt from "bcryptjs";
import {HttpErrorResponse} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {User} from "../../../model/user/user";

@Component({
  selector: 'app-password-reset',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    RecaptchaModule,
    LogoComponent
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS, useValue: {
        siteKey: environment.siteKey
      }
    }
  ],
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css', '../commonCss/auth.styles.scss', '../../main/main.component.scss']
})
export class PasswordResetComponent extends AuthenticationComponent implements OnInit {
  // Input Fields
  newPasswordInput: string = "";
  newPasswordConfirmInput: string = "";

  // Logic Fields
  isPasswordSame: boolean = false;
  token: string | null = "";
  _isPasswordReset: boolean = false;

  constructor(private customerService: CustomerService,
              private businessService: BusinessService,
              private adminService: AdminService,
              private deliveryServiceService: DeliveryServiceService,
              private deliveryPersonService: DeliveryPersonService,
              private emailService: EmailService,
              private cookieService: CookieService,
              private router: Router, private route: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.token = params[StorageKeys.USER_TOKEN];
    });

    try {
      this.token = this.cookieService.get(StorageKeys.USER_TOKEN);
      if (this.token == null || !(this.token.length > 0)) {
        this.routeToHome(this.router, this.route);
      }
    } catch (e) {
      this.routeToHome(this.router, this.route);
    }
  }


  override onSubmit() {
    new Promise<boolean>((resolve, reject) => {
      if (this.isFormValid()) {
        if (this.token != null) {
          this.fetchService().findUserByToken(this.token).subscribe({
            next: (jsonUser: User) => {
              if (jsonUser != null) {
                if (this.token == jsonUser.token) {
                  bcrypt.compare(this.newPasswordInput, jsonUser.password).then(success => {
                    if (!success) {
                      bcrypt.hash(this.newPasswordInput, this.hashSalt, (err, hashPassword) => {
                        this.fetchService().updatePasswordByEmail({email: jsonUser.email, password: hashPassword})
                          .subscribe({
                            next: (success: number) => {
                              if (success == 1) {
                                console.log("Password updated");
                                this.resetTokenCookie(this.cookieService, this.fetchService())
                                  .then((success) => {
                                    resolve(success);
                                });
                              } else {
                                console.log("Password not updated");
                                resolve(false);
                              }
                            },
                            error: (e: HttpErrorResponse) => {
                              console.log("HTTP Error: Password not updated");
                              resolve(false);
                            }
                          });
                      });
                    } else {
                      this.isPasswordSame = success;
                      console.log("Password is the same")
                      resolve(false);
                    }
                  });
                } else {
                  console.log("Tokens are different")
                  resolve(false)
                }
              } else {
                console.log("User not found");
                resolve(false);
              }
            },
            error: (e: HttpErrorResponse) => {
              console.log("HTTP Error: User not found");
              resolve(false);
            }
          });
        }
      } else {
        resolve(false)
      }
    }).then((success) => {
      super.onSubmit();
      if (success) {
        this._isPasswordReset = true;
      }
    });

  }

  override isFormValid(): boolean {
    return this.isPasswordsMatch()
      && this.isCaptchaValid()
      && this.isPasswordProper(this.newPasswordInput);
  }

  fetchService(): UserService<any> {
    switch (this.getCurrentUserCategory(this.cookieService).name) {
      case(adminCategory.name):
        return this.adminService;
      case(businessCategory.name):
        return this.businessService;
      case(customerCategory.name):
        return this.customerService;
      case(deliveryPersonCategory.name):
        return this.deliveryPersonService;
      case(deliveryServiceCategory.name):
        return this.deliveryServiceService;
    }
    return this.customerService;
  }

  isPasswordsNotMatch() {
    return !this.isPasswordsMatch() && this.isSubmitted;
  }


  isPasswordInvalid() {
    return !this.isPasswordProper(this.newPasswordInput) && this.isSubmitted;
  }

  isPasswordsMatch(): boolean {
    return this.newPasswordInput === this.newPasswordConfirmInput;
  }

  isPasswordReset(): boolean {
    return this._isPasswordReset && this.isSubmitted;
  }
}
