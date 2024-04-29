import {FormComponent} from "../misc/form-component";
import {
  adminCategory,
  businessCategory,
  customerCategory,
  deliveryPersonCategory, deliveryServiceCategory,
  UserCategory
} from "../../service/user/userCategories";
import {StorageKeys} from "../misc/storage-keys";
import {CookieService} from "ngx-cookie-service";
import {CustomerService} from "../../service/user/customer.service";
import {BusinessService} from "../../service/user/business.service";
import {AdminService} from "../../service/user/admin.service";
import {DeliveryServiceService} from "../../service/user/delivery-service.service";
import {DeliveryPersonService} from "../../service/user/delivery-person.service";
import {EmailService} from "../../service/misc/email.service";
import {UserService} from "../../service/user/user.service";
import {User} from "../../model/user/user";
import {Customer} from "../../model/user/customer";
import {HttpErrorResponse} from "@angular/common/http";
import bcrypt from "bcryptjs";
import {Email} from "../../model/misc/email";
import {makeRandomNumber} from "../misc/functions";

export abstract class AuthenticationComponent extends FormComponent {
  protected captcha: string | null = "";

  // Validation messages
  protected passwordInvalidMessage: String = "Password must have at least one lowercase and uppercase letter, one number, and 8 characters long.";
  protected oldPasswordInvalidMessage: String = "Old Password is incorrect.";
  protected passwordsNotMatchMessage: String = "Passwords do not match.";
  protected fieldInvalidMessage: String = "Field is invalid.";
  protected notRobotMessage: string = "Please verify that you're not a robot."

  // Static vars
  protected hashSalt: number = 10;

  // Services
  protected emailService!: EmailService;

  protected constructor() {
    super();
  }

  resolved(captchaResponse: string | null) {
    this.captcha = captchaResponse;
  }

  isCaptchaInvalid(): boolean {
    return !this.isCaptchaValid() && this.isSubmitted;
  }

  isCaptchaValid(): boolean {
    return this.captcha != null && this.captcha.length > 0;
  }

  isEmailProper(email: string): boolean {
    let regex = new RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$");
    return regex.test(email)
  }

  isPasswordProper(password: string): boolean {
    // Password must contain at least one number, one uppercase letter, one lowercase letter, and at least 8 characters
    let regex = new RegExp("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$");
    return regex.test(password);
  }

  isFieldProper(field: string): boolean {
    return field.length > 0;
  }

  sendVerificationEmail(emailInput: string): Promise<string | null> {
    return new Promise<string | null>((resolve, reject) => {
      let code = makeRandomNumber(5);
      console.log("Code: ", code);

      bcrypt.hash(String(code), 5, (err, verificationCodeHash) => {
        let email: Email = Email.verificationEmail(emailInput, code);
        console.log("Email: ", email);
        this.emailService.sendEmail(email).subscribe({
          next: (success: boolean) => {
            if (success) {
              console.log("Email sent");
              resolve(verificationCodeHash);
            } else {
              console.log("Email not sent");
              resolve(null);
            }
          },
          error: (error: HttpErrorResponse) => {
            console.log("Error in sending email: ", error);
            resolve(null);
          }
        })
      });
    });
  }
}
