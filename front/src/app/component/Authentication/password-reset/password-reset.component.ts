import {Component} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {FormComponent} from "../../form-component";
import {AuthenticationComponent} from "../authentication-component";
import {NgIf} from "@angular/common";
import {RECAPTCHA_SETTINGS, RecaptchaModule} from "ng-recaptcha";
import {environment} from "../../../../environment/environment.prod";

@Component({
  selector: 'app-password-reset',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    RecaptchaModule
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS, useValue: {
        siteKey: environment.siteKey
      }
    }
  ],
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css', '../commonCss/auth.styles.css', '../../main/main.component.scss']
})
export class PasswordResetComponent extends AuthenticationComponent {

  override isFormValid(): boolean {
    throw new Error('Method not implemented.');
  }

}
