import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {AuthenticationComponent} from "../authentication-component";
import {NgIf} from "@angular/common";
import {RECAPTCHA_SETTINGS, RecaptchaModule} from "ng-recaptcha";
import {environment} from "../../../../environment/environment.prod";
import {LogoComponent} from "../../logo/logo.component";
import {ActivatedRoute, Router} from "@angular/router";
import {CustomerService} from "../../../service/user/customer.service";
import {BusinessService} from "../../../service/user/business.service";
import {AdminService} from "../../../service/user/admin.service";
import {DeliveryServiceService} from "../../../service/user/delivery-service.service";
import {DeliveryPersonService} from "../../../service/user/delivery-person.service";
import {EmailService} from "../../../service/misc/email.service";
import {StorageKeys} from "../../misc/storage-keys";
import bcrypt from "bcryptjs";
import {HttpErrorResponse} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {User} from "../../../model/user/user";
import {FooterComponent} from "../../footer/footer.component";
import {NgxResizeObserverModule} from "ngx-resize-observer";

@Component({
  selector: 'app-password-reset',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    RecaptchaModule,
    LogoComponent,
    FooterComponent,
    NgxResizeObserverModule
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS, useValue: {
        siteKey: environment.siteKey
      }
    }
  ],
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css', '../auth.styles.scss', '../../main/main.component.scss']
})
export class PasswordResetComponent extends AuthenticationComponent implements OnInit {
  // Input Fields
  newPasswordInput: string = "";
  newPasswordConfirmInput: string = "";

  // Logic Fields
  isPasswordSame: boolean = false;
  token: string | null = "";
  _isPasswordReset: boolean = false;

  constructor(protected override customerService: CustomerService,
              protected override businessService: BusinessService,
              protected override adminService: AdminService,
              protected override deliveryServiceService: DeliveryServiceService,
              protected override deliveryPersonService: DeliveryPersonService,
              protected override cookieService: CookieService,
              protected override emailService: EmailService,
              protected override router: Router, protected override route: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.token = params[StorageKeys.USER_TOKEN];
    });

    try {
      if (this.token == null ||
        !(this.token.length > 0) ||
        this.token != this.cookieService.get(StorageKeys.USER_TOKEN)) {
        this.routeToHome();
      }
    } catch (e) {
      this.routeToHome();
    }
  }


  override onSubmit() {
    new Promise<boolean>((resolve, reject) => {
      if (this.isFormValid()) {
        if (this.token != null) {
          this.fetchUserService().findUserByToken({token: this.token}).subscribe({
            next: (jsonUser: User) => {
              if (jsonUser != null) {
                if (this.token == jsonUser.token) {
                  bcrypt.compare(this.newPasswordInput, jsonUser.password).then(success => {
                    if (!success) {
                      bcrypt.hash(this.newPasswordInput, this.hashSalt, (err, hashPassword) => {
                        this.fetchUserService().updatePasswordByEmail({email: jsonUser.email, newPassword: hashPassword})
                          .subscribe({
                            next: (success: number) => {
                              if (success == 1) {
                                console.log("Password updated");
                                this.resetTokenByOldToken()
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
