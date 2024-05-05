import {User} from "./user";
import {Address} from "../odSystem/address";
import {RatingList} from "../rating.list";
import {CustomerOrder} from "../odSystem/customer.order";

export class Customer extends User {
  override customerId: number | undefined;
  override firstName: string;
  override lastName: string;

  // CHILD TABLES
  override addresses: Address[] = [];
  override ratingLists: RatingList[] = [];
  override customerOrders: CustomerOrder[] = [];

  constructor(firstName: string, lastName: string, email: string,
              username: string, password: string,
              customerId?: number | undefined,
              registrationDate?: string | undefined, token?: string | undefined,
              emailVerified?: boolean | undefined, pfpImgPath?: string | undefined, name?: string | undefined) {
    super(email, username, password, customerId, registrationDate, token, emailVerified, pfpImgPath, name);
    this.customerId = customerId;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
