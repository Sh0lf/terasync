import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import bcrypt from "bcryptjs";
import {NgIf} from "@angular/common";
import {FormComponent} from "../../misc/form-component";
import {ActivatedRoute, Router} from "@angular/router";
import {Customer} from "../../../model/user/customer";
import {InternalObjectService} from "../../../service/misc/internal-object.service";
import {CustomerService} from "../../../service/user/customer.service";
import {HttpErrorResponse} from "@angular/common/http";
import {LogoComponent} from "../../logo/logo.component";
import {User} from "../../../model/user/user";
import {CookieService} from "ngx-cookie-service";
import {AdminService} from "../../../service/user/admin.service";
import {BusinessService} from "../../../service/user/business.service";
import {DeliveryServiceService} from "../../../service/user/delivery-service.service";
import {DeliveryPersonService} from "../../../service/user/delivery-person.service";
import {FooterComponent} from "../../footer/footer.component";
import {NgxResizeObserverModule} from "ngx-resize-observer";

@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    LogoComponent,
    FooterComponent,
    NgxResizeObserverModule
  ],
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css', '../auth.styles.scss', '../../main/main.component.scss']
})
export class VerifyEmailComponent extends FormComponent implements OnInit {
  // Form Fields
  verificationCodeInput: string = "";

  // Logic Fields
  verificationCodeHash: string | null = "";
  isCodeValid: boolean = false;

  // Service Fields
  inputObject!: { verificationCodeHash: string, user: User };

  constructor(protected override customerService: CustomerService,
              protected override adminService: AdminService,
              protected override businessService: BusinessService,
              protected override deliveryServiceService: DeliveryServiceService,
              protected override deliveryPersonService: DeliveryPersonService,
              protected override cookieService: CookieService,
              private internalObjectService: InternalObjectService<{
                verificationCodeHash: string,
                user: User
              }>,
              protected override router: Router, protected override route: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.inputObject = this.internalObjectService.getObject();
    console.log(this.inputObject);

    // Checks if a verification code exists
    if (this.inputObject?.verificationCodeHash == null) {
      // todo may need to change the redirection here in the future
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
            this.fetchUserService().verifyEmail(this.inputObject.user.email).subscribe({
              next: (successEmail: number) => {
                if (successEmail == 1) {
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
      } else {
        console.log('Form is invalid');
        resolve(false);
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
