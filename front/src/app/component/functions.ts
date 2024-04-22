import {Customer} from "../model/user/customer";
import {HttpErrorResponse} from "@angular/common/http";
import {UserService} from "../service/user/user.service";

export function makeRandom(lengthOfCode: number): string {
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz";
  let text = "";
  for (let i = 0; i < lengthOfCode; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export function makeRandomToken(): string {
  return makeRandom(40);
}

export function checkEmail(email: string, userService: UserService<any>): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    userService.findUserByEmail(email).subscribe({
      next: (customer: Customer) => {
        resolve(customer != null);
      },
      error: (error: HttpErrorResponse) => {
        resolve(false);
      }
    });
  });
}
