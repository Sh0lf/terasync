import {User} from "./user";

export class Admin extends User{
  adminId: number | undefined;
  firstName: string;
  lastName: string;

  constructor(firstName: string, lastName: string, email: string,
              username: string, password: string,
              adminId?: number | undefined,
              registrationDate?: string | undefined,  token?: string | undefined) {
    super(email, username, password, registrationDate, token);
    this.adminId = adminId;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  override getName(): string {
    return this.firstName + " " + this.lastName;
  }

  override getUserId(): number | undefined {
    return this.adminId;
  }

  createInstance(jsonString: Admin): Admin {
    return new Admin(
      jsonString.firstName, jsonString.lastName, jsonString.email,
      jsonString.username, jsonString.password,
      jsonString.adminId,
      jsonString.registrationDate, jsonString.token
    )
  }
}
