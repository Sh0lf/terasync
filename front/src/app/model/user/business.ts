import { User } from "./user";

export class Business extends User {
  businessId: number | undefined;
  override name: string;
  address: string;
  phone: string;
  protected constructor(email: string, username: string, password: string,
                        name: string, address: string, phone: string,
                        registrationDate?: string | undefined, businessId?: number | undefined,
                        token?: string | undefined) {
    super(email, username, password, businessId, registrationDate, token, name);
    this.businessId = businessId;
    this.name = name;
    this.address = address;
    this.phone = phone;
  }

  override createInstance(jsonString: User): User {
    throw new Error("Method not implemented.");
  }
}
