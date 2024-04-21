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
import {makeRandom} from "../../functions";
import {SessionStorageKeys} from "../../session-storage-keys";

@Component({
  selector: 'app-password-recovery',
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
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.css', '../commonCss/auth.styles.css', '../../main/main.component.scss']
})
export class PasswordRecoveryComponent extends AuthenticationComponent implements OnInit {
  // Form fields
  emailInput: string = "";
  user!: User;

  // Logic Fields
  isEmailExist: boolean = false;
  isEmailChecked: boolean = false;
  userToken: string = "";

  constructor(private customerService: CustomerService,
              private businessService: BusinessService,
              private adminService: AdminService,
              private deliveryServiceService: DeliveryServiceService,
              private deliveryPersonService: DeliveryPersonService,
              private emailService: EmailService,
              private router: Router, private route: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    console.log("current category: " + this.currenUserCategory.name);
  }

  override isFormValid(): boolean {
    return this.emailInput.length > 0 && !this.isCaptchaInvalid();
  }

  override onSubmit() {
    super.onSubmit();

    if (this.isFormValid()) {
      this.fetchService().findUserByEmail(this.emailInput).subscribe({
        next: (user: User) => {
          this.user = user;
          if (this.user != null) {
            this.isEmailExist = true;
            this.emailService.sendEmail(Email.recoveryEmail(user.email)).subscribe({
                next: (success: boolean) => {
                  if (success) {
                    console.log('Email sent');
                    this.userToken = makeRandom(20);
                    sessionStorage.setItem(SessionStorageKeys.USER_TOKEN, this.userToken);
                  } else {
                    console.error('Email not sent');
                  }
                },
                error: (error: HttpErrorResponse) => {
                  console.error("HTTP ERROR: Email not sent");
                }
              }
            )
            console.log('Email exists');
          } else {
            console.log('Email does not exist');
          }
          this.isEmailChecked = true;
        },
        error: (error: HttpErrorResponse) => {
          console.error("HTTP ERROR: Email does not exist");
        }
      });
    }
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
    return !this.isEmailExist && !this.isEmailInvalid() && this.isSubmitted && this.isEmailChecked;
  }

  isEmailInvalid(): boolean {
    return !(this.isEmailProper(this.emailInput) && this.emailInput.length > 0) && this.isSubmitted;
  }

}
