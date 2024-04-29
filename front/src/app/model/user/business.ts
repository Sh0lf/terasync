import {User} from "./user";

export class Business extends User {
  override businessId: number | undefined;
  override address: string;
  override phone: string;
  override approved: boolean | undefined;

  constructor(name: string, email: string, username: string,
              password: string, address: string, phone: string,
              businessId?: number | undefined,
              registrationDate?: string | undefined, token?: string | undefined,
              emailVerified?: boolean | undefined, approved?: boolean | undefined,
              pfpImgPath?: string | undefined) {
    super(email, username, password, businessId, registrationDate, token, emailVerified, pfpImgPath, name);
    this.businessId = businessId;
    this.address = address;
    this.phone = phone;
    this.approved = approved;
  }
}
