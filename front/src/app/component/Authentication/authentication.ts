export abstract class Authentication {
  protected captcha: string | null = "";
  protected isSubmitted: boolean = false;

  resolved(captchaResponse: string | null) {
    this.captcha = captchaResponse;
  }

  isCaptchaInvalid(): boolean {
    return !(this.captcha != null && this.captcha.length > 0) && this.isSubmitted;
  }

  onSubmit() {
    this.isSubmitted = true;
  };

  isEmailProper(email: string): boolean {
    let regex = new RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$");
    return regex.test(email)
  }

  isPasswordProper(password: string):boolean {
    let regex = new RegExp("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$");
    return regex.test(password);
  }

  abstract isFormValid(): boolean;
}
