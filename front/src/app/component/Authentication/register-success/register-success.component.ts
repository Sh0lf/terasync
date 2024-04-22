import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {SessionStorageKeys} from "../../session-storage-keys";
import bcrypt from "bcryptjs";
import {NgIf} from "@angular/common";
import {FormComponent} from "../../form-component";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {Customer} from "../../../model/user/customer";
import {InternalObjectService} from "../../../service/internal-object.service";
import {CustomerService} from "../../../service/user/customer.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-register-success',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './register-success.component.html',
  styleUrls: ['./register-success.component.css', '../commonCss/auth.styles.css', '../../main/main.component.scss']
})
export class RegisterSuccessComponent extends FormComponent implements OnInit {
  // Form Fields
  verificationCodeInput: string = "";

  // Logic Fields
  verificationCodeHash: string | null = "";
  isCodeValid: boolean = false;

  // Service Fields
  inputObject!: {verificationCodeHash: string, customer: Customer};

  constructor(private customerService: CustomerService,
              private internalObjectService: InternalObjectService<{verificationCodeHash: string, customer: Customer}>,
              private router: Router, private route: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.inputObject = this.internalObjectService.getObject();
    console.log(this.inputObject);

    // Checks if a verification code exists
    if (this.inputObject?.verificationCodeHash == null) {
      this.router.navigate([''], {relativeTo: this.route}).then();
    } else {
      this.verificationCodeHash = this.inputObject.verificationCodeHash;
    }
  }

  override isFormValid(): boolean {
    return this.verificationCodeInput.length > 0;
  }

  override onSubmit() {
    new Promise<boolean>((resolve, reject) => {
      if (this.isFormValid() && this.verificationCodeHash != null) {
        bcrypt.compare(this.verificationCodeInput, this.verificationCodeHash).then(successCompare => {
          if (successCompare) {
            console.log('Code is valid');
            this.customerService.verifyEmail(this.inputObject.customer.email).subscribe({
              next: (successEmail: number) => {
                if(successEmail == 1) {
                  console.log('Email is verified');
                  resolve(true);
                }
              },
              error: (error: HttpErrorResponse) => {
                console.log('Email is not verified, HTTP ERROR');
                resolve(false);
              }
            });
          } else {
            console.log('Code is invalid');
            resolve(false);
          }
        });
      }
    }).then((success) => {
      this.isCodeValid = success;
      super.onSubmit();
    });
  }

  isCodeInvalid(): boolean {
    return !this.isCodeValid && this.isSubmitted;
  }
}
