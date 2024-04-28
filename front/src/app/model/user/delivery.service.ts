import {User} from "./user";

export class DeliveryService extends User {
  deliveryServiceId: number | undefined
  approved: boolean | undefined;

  constructor(name: string, email: string, username: string,
              password: string,
              deliveryServiceId?: number | undefined,
              registrationDate?: string | undefined,  token?: string | undefined,
              emailVerified?: boolean | undefined, approved?: boolean | undefined,
              pfpImgPath?: string | undefined) {
    super(email, username, password, deliveryServiceId, registrationDate, token, emailVerified, pfpImgPath, name);
    this.deliveryServiceId = deliveryServiceId;
    this.approved = approved;
  }
}
