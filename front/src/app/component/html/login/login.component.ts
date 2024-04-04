import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HttpClientModule} from "@angular/common/http";
import {NgForOf} from "@angular/common";
import {RECAPTCHA_SETTINGS, RecaptchaModule} from "ng-recaptcha";
import {FormsModule} from "@angular/forms";
import {environment} from "../../../../environment/environment.prod";

@Component({
  selector: 'login-component',
  standalone: true,
  imports: [
    RouterOutlet,
    NgForOf, HttpClientModule,
    FormsModule,
    RecaptchaModule
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS, useValue: {
        siteKey: environment.siteKey
      }
    }
  ],
  templateUrl: './login.component.html',
  styleUrls: ['../../css/login.styles.css', '../../css/main.component.scss']
})
export class LoginComponent implements OnInit {
  captcha: string | null;

  constructor() {
    this.captcha = '';
  }

  ngOnInit() {
  }

  resolved(captchaResponse: string | null) {
    this.captcha = captchaResponse;
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

}
