import {User} from "./user";
import {CustomerOrder} from "../odSystem/customer.order";
import {DeliveryServiceList} from "../odSystem/delivery.service.list";
import {ProductMenu} from "../odSystem/product.menu";
import {Product} from "../odSystem/product";
import {RatingList} from "../rating.list";

export class Business extends User {
  override businessId: number | undefined;
  override address: string;
  override phone: string;
  override approved: boolean | undefined;

  override customerOrders: CustomerOrder[] = [];
  override deliveryServiceLists: DeliveryServiceList[] = [];
  override productMenus: ProductMenu[] = [];
  override products: Product[] = [];
  override ratingLists: RatingList[] = [];

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
