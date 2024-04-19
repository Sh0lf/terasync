import {User} from "./user";

export abstract class Admin extends User{
  adminId: number;
  firstName: string;
  lastName: string;

  protected constructor(email: string, username: string, password: string, registrationDate: string, adminId: number, firstName: string, lastName: string) {
    super(email, username, password, registrationDate);
    this.adminId = adminId;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  override getName(): string {
    return this.firstName + " " + this.lastName;
  }

  override getUserId(): number {
    return this.adminId;
  }
}
