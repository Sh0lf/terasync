import { User } from "./user";

export abstract class Business extends User {
  businessId: number;
  name: string;
  address: string;
  phone: string;

  protected constructor(email: string, username: string, password: string, registrationDate: string, businessId: number, name: string, address: string, phone: string) {
    super(email, username, password, registrationDate);
    this.businessId = businessId;
    this.name = name;
    this.address = address;
    this.phone = phone;
  }

  override getUserId(): number {
    return this.businessId;
  }

  override getName(): string {
    return this.name;
  }
}
