import {User} from "./user";
import {CustomerOrder} from "../odSystem/customer.order";
import {DeliveryServiceList} from "../odSystem/delivery.service.list";
import {ProductMenu} from "../odSystem/product.menu";
import {Product} from "../odSystem/product";
import {RatingList} from "../rating.list";

export class Business extends User {
  protected override name: string;
  override businessId: number | undefined;
  override address: string;
  override phone: string;
  override approved: boolean | undefined;
  override thumbnail: string | undefined;

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
              pfpImgPath?: string | undefined, thumbnail?: string | undefined) {
    super(email, username, password, businessId, registrationDate, token, emailVerified, pfpImgPath, name, thumbnail);
    this.name = name;
    this.businessId = businessId;
    this.address = address;
    this.phone = phone;
    this.approved = approved;
  }

  static override fromJson(jsonBusiness: Business) {
    let business = new Business(jsonBusiness.name, jsonBusiness.email, jsonBusiness.username,
      jsonBusiness.password, jsonBusiness.address, jsonBusiness.phone,
      jsonBusiness.businessId, jsonBusiness.registrationDate, jsonBusiness.token,
      jsonBusiness.emailVerified, jsonBusiness.approved, jsonBusiness.pfpImgPath, jsonBusiness.thumbnail)

    business.customerOrders = CustomerOrder.initializeCustomerOrders(jsonBusiness);
    business.deliveryServiceLists = DeliveryServiceList.initializeDeliveryServiceLists(jsonBusiness);
    business.productMenus = ProductMenu.initializeProductMenus(jsonBusiness);
    business.products = Product.initializeProducts(jsonBusiness);
    business.ratingLists = RatingList.initializeRatingLists(jsonBusiness);

    return business;
  }
}
