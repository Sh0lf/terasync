import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HttpClientModule} from "@angular/common/http";
import {NgForOf, NgIf} from "@angular/common";
import {RECAPTCHA_SETTINGS, RecaptchaModule} from "ng-recaptcha";
import {FormsModule} from "@angular/forms";
import {environment} from "../../../environment/environment.prod";

@Component({
  selector: 'login-component',
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
  styleUrls: ['./login.styles.css', '../main/main.component.scss']
})
export class LoginComponent implements OnInit {
  lgEmail: string = '';
  lgPassword: string = '';
  captcha: string | null = '';
  submitted: boolean = false;

  constructor() {}

  ngOnInit() {
  }

  resolved(captchaResponse: string | null) {
    this.captcha = captchaResponse;
  }

  onSubmit() {
    this.submitted = true;
    this.isCaptchaValid();

    console.log('is valid: ' + this.isCaptchaValid());
    console.log('Email: ' + this.lgEmail);
    console.log('Password: ' + this.lgPassword);
    console.log('Captcha: ' + this.captcha);
  }

  isCaptchaValid(): boolean {
    return this.captcha != null && this.captcha.length > 0;
  }
}
