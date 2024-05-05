import {User} from "./user";

export class Admin extends User{
  override adminId: number | undefined;
  override firstName: string;
  override lastName: string;

  constructor(firstName: string, lastName: string, email: string,
              username: string, password: string,
              adminId?: number | undefined,
              registrationDate?: string | undefined,  token?: string | undefined,
              emailVerified?: boolean | undefined, pfpImgPath?: string | undefined, name?: string | undefined) {
    super(email, username, password, adminId, registrationDate, token, emailVerified, pfpImgPath, name);
    this.adminId = adminId;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
