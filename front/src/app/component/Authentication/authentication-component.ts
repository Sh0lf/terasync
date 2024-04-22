import {FormComponent} from "../form-component";
import {customerCategory, UserCategory} from "../../service/user/userCategories";
import {SessionStorageKeys} from "../session-storage-keys";

export abstract class AuthenticationComponent extends FormComponent {
  protected captcha: string | null = "";
  protected _currentUserCategory: UserCategory = customerCategory;

  protected constructor() {
    super();
  }

  resolved(captchaResponse: string | null) {
    this.captcha = captchaResponse;
  }

  isCaptchaInvalid(): boolean {
    return !(this.captcha != null && this.captcha.length > 0) && this.isSubmitted;
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

  //Easter Egg
  get currenUserCategory(): UserCategory {
    try {
      this._currentUserCategory = UserCategory.fromJson(sessionStorage.getItem(SessionStorageKeys.USER_CATEGORY));
    } catch (e: any) {
    }
    return this._currentUserCategory;
  }
}
