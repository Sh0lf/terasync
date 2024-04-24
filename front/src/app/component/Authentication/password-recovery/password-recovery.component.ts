import {Component, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {AuthenticationComponent} from "../authentication-component";
import {FormsModule} from "@angular/forms";
import {RECAPTCHA_SETTINGS, RecaptchaModule} from "ng-recaptcha";
import {environment} from "../../../../environment/environment.prod";
import {User} from "../../../model/user/user";
import {UserService} from "../../../service/user/user.service";
import {CustomerService} from "../../../service/user/customer.service";
import {BusinessService} from "../../../service/user/business.service";
import {AdminService} from "../../../service/user/admin.service";
import {DeliveryServiceService} from "../../../service/user/delivery-service.service";
import {DeliveryPersonService} from "../../../service/user/delivery-person.service";
import {ActivatedRoute, Router} from "@angular/router";
import {
  adminCategory,
  businessCategory,
  customerCategory,
  deliveryPersonCategory,
  deliveryServiceCategory
} from "../../../service/user/userCategories";
import {EmailService} from "../../../service/email.service";
import {Email} from "../../../model/email";
import {HttpErrorResponse} from "@angular/common/http";
import {makeRandomToken} from "../../functions";
import {StorageKeys} from "../../storage-keys";
import {LogoComponent} from "../../logo/logo.component";
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-password-recovery',
  standalone: true,
  imports: [
    NgIf,
    RecaptchaModule,
    FormsModule, LogoComponent
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS, useValue: {
        siteKey: environment.siteKey
      }
    }
  ],
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.css', '../commonCss/auth.styles.scss', '../../main/main.component.scss']
})
export class PasswordRecoveryComponent extends AuthenticationComponent implements OnInit {
  // Form fields
  emailInput: string = "";
  user!: User;

  // Logic Fields
  isEmailExist: boolean = false;
  isEmailChecked: boolean = false;
  _isEmailSent: boolean = false;
  userToken: string = "";

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
    console.log("current category: " + this.currenUserCategory.name);
  }

  override isFormValid(): boolean {
    return this.isEmailProper(this.emailInput) && this.isCaptchaValid();
  }

  override onSubmit() {
    new Promise<boolean>((resolve, reject) => {
      if (this.isFormValid()) {
        this.fetchService().findUserByEmail(this.emailInput).subscribe({
          next: (user: User) => {
            this.user = user;
            if (this.user != null) {
              this.isEmailExist = true;
              this.userToken = makeRandomToken();
              this.emailService.sendEmail(Email.recoveryEmail(user.email, this.userToken)).subscribe({
                  next: (success: boolean) => {
                    if (success) {
                      this.cookieService.set(StorageKeys.USER_TOKEN, this.userToken);
                      console.log('Email sent');
                      resolve(true);
                    } else {
                      console.error('Email not sent');
                      resolve(false);
                    }
                  },
                  error: (error: HttpErrorResponse) => {
                    console.error("HTTP ERROR: Email not sent");
                    resolve(false);
                  }
                }
              )
            } else {
              console.log('Email does not exist');
              resolve(false);
            }
          },
          error: (error: HttpErrorResponse) => {
            console.error("HTTP ERROR: Email does not exist");
            resolve(false);
          }
        });
      }
    }).then(success => {
      this.isEmailChecked = true;
      this._isEmailSent = success;
      super.onSubmit();
    });
  }

  fetchService(): UserService<any> {
    switch (this.currenUserCategory.name) {
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

  isEmailNotExist(): boolean {
    return !this.isEmailExist &&
      !this.isEmailInvalid() &&
      this.isSubmitted &&
      this.isEmailChecked;
  }

  isEmailInvalid(): boolean {
    return !(this.isEmailProper(this.emailInput) && this.emailInput.length > 0) && this.isSubmitted;
  }

  isEmailSent() {
    return this._isEmailSent && this.isSubmitted;
  }
}
