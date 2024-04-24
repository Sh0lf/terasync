import {Customer} from "../../model/user/customer";
import {HttpErrorResponse} from "@angular/common/http";
import {UserService} from "../../service/user/user.service";
import {User} from "../../model/user/user";
import bcrypt from "bcryptjs";
import {Email} from "../../model/email";
import {EmailService} from "../../service/email.service";

export function generateRandomString(length: number): string {
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz";
  let text = "";
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export function generateRandomToken(): string {
  return generateRandomString(150);
}

export function makeRandomNumber(lengthOfCode: number): number {
  return Math.floor(Math.random() * Math.pow(10, lengthOfCode));
}

export function checkEmail(email: string, userService: UserService<any>): Promise<User | null> {
  return new Promise<User | null>((resolve, reject) => {
    userService.findUserByEmail(email).subscribe({
      next: (customer: Customer) => {
        resolve(customer);
      },
      error: (error: HttpErrorResponse) => {
        resolve(null);
      }
    });
  });
}

export function sendVerificationEmail(emailInput: string, emailService: EmailService): Promise<string | null> {
  return new Promise<string | null>((resolve, reject) => {
    let code = makeRandomNumber(5);
    console.log("Code: ", code);

    bcrypt.hash(String(code), 5, (err, verificationCodeHash) => {
      let email: Email = Email.verificationEmail(emailInput, code);
      console.log("Email: ", email);
      emailService.sendEmail(email).subscribe({
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
