import {Customer} from "../../model/user/customer";
import {HttpErrorResponse} from "@angular/common/http";
import {UserService} from "../../service/user/user.service";
import {User} from "../../model/user/user";
import bcrypt from "bcryptjs";
import {Email} from "../../model/misc/email";
import {EmailService} from "../../service/misc/email.service";

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