import {User} from "./user";

export class Business extends User {
  businessId: number | undefined;
  address: string;
  phone: string;
  approved: boolean | undefined;

  constructor(name: string, email: string, username: string,
              password: string, address: string, phone: string,
              businessId?: number | undefined,
              registrationDate?: string | undefined, token?: string | undefined,
              emailVerified?: boolean | undefined, approved?: boolean | undefined) {
    super(email, username, password, businessId, registrationDate, token, emailVerified, name);
    this.businessId = businessId;
    this.address = address;
    this.phone = phone;
    this.approved = approved;
  }
}
