import {Component} from '@angular/core';
import {ActivatedRoute, Router, RouterOutlet} from '@angular/router';
import {HttpClientModule, HttpErrorResponse} from "@angular/common/http";
import {NgForOf, NgIf} from "@angular/common";
import {RECAPTCHA_SETTINGS, RecaptchaModule} from "ng-recaptcha";
import {FormsModule} from "@angular/forms";
import {environment} from "../../../../environment/environment.prod";
import {CustomerService} from "../../../service/user/customer.service";
import {
  adminCategory,
  businessCategory,
  customerCategory,
  deliveryPersonCategory,
  deliveryServiceCategory,
  UserCategory
} from "../../../service/user/userCategories";
import {UserType} from "../../../service/user/user.type";
import {BusinessService} from "../../../service/user/business.service";
import {AdminService} from "../../../service/user/admin.service";
import {DeliveryServiceService} from "../../../service/user/delivery-service.service";
import {DeliveryPersonService} from "../../../service/user/delivery-person.service";
import {UserService} from "../../../service/user/user.service";
import {User} from "../../../model/user/user";
import {Authentication} from "../authentication";
import bcrypt from "bcryptjs";
import {Customer} from "../../../model/user/customer";

// @ts-ignore
@Component({
  selector: 'app-login',
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
  styleUrls: ['./login.component.css', '../commonCss/auth.styles.css', '../../main/main.component.scss']
})
export class LoginComponent extends Authentication {
  // Form fields
  protected emailInput: string = "";
  protected passwordInput: string = "";

  // Logic Fields
  protected isLoginValid: boolean = false;
  protected _currentUserCategory: UserCategory = customerCategory;

  constructor(private customerService: CustomerService,
              private businessService: BusinessService,
              private adminService: AdminService,
              private deliveryServiceService: DeliveryServiceService,
              private deliveryPersonService: DeliveryPersonService,
              private router: Router, private route: ActivatedRoute) {
    super();
  }

  override onSubmit() {
    super.onSubmit();

    if (this.isFormValid()) {
      this.fetchService().findUserByEmail(this.emailInput).subscribe({
        error: (error: HttpErrorResponse) => {
          console.log('Login is invalid, HTTP ERROR');
        },
        next: (jsonUser: User) => {
          bcrypt.compare(this.passwordInput, jsonUser.password).then(success => {
            this.isLoginValid = success;
            if (this.isLoginValid) {
              console.log('Login is valid');
            } else {
              console.log('Login is invalid');
            }
          });
        },
      });
    } else {
      console.log('Login is invalid');
    }
  }

  override isFormValid(): boolean {
    return !this.isEmailInvalid() && !this.isPasswordInvalid() && !this.isCaptchaInvalid();
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

  isEmailInvalid(): boolean {
    return !(this.isEmailProper(this.emailInput) && this.emailInput.length > 0) && this.isSubmitted;
  }

  isPasswordInvalid(): boolean {
    return !(this.passwordInput.length > 0) && this.isSubmitted;
  }

  isLoginInvalid(): boolean {
    return !(this.isLoginValid) && this.isSubmitted;
  }

  isPartnerType(): boolean {
    return this.currenUserCategory.userType === UserType.PARTNER;
  }

  get currenUserCategory(): UserCategory {
    try {
      this._currentUserCategory = UserCategory.fromJson(sessionStorage.getItem(UserCategory.name));
    } catch (e: any) {
    }
    return this._currentUserCategory;
  }

  getOppositeUserType(): UserType {
    return this.isPartnerType() ? UserType.CUSTOMER : UserType.PARTNER;
  }

  switchUserType() {
    if (this.isPartnerType()) {
      sessionStorage.setItem(UserCategory.name, JSON.stringify(customerCategory));
    } else {
      this.router.navigate(['/partner-selection'], {relativeTo: this.route}).then();
    }
  }
}
