import {ProductImage} from "./product.image";
import {CustomerOrderList} from "./customer.order.list";
import {ProductList} from "./product.list";
import {ProductMenuList} from "./product.menu.list";

export class ProductMenu {
  productMenuId: number | undefined;
  name: string;
  creationTime: string;
  discount: number;
  isVegan: boolean;
  businessId: number;

  productLists: ProductList[] = [];
  productMenuLists: ProductMenuList[] = [];


  constructor(name: string, creationTime: string, discount: number, isVegan: boolean, businessId: number, productMenuId?: number) {
    this.productMenuId = productMenuId;
    this.name = name;
    this.creationTime = creationTime;
    this.discount = discount;
    this.isVegan = isVegan;
    this.businessId = businessId;
  }

  public static fromJson(json: ProductMenu): ProductMenu {
    let productMenu: ProductMenu = new ProductMenu(json.name, json.creationTime, json.discount,
      json.isVegan, json.businessId, json.productMenuId);

    productMenu.productLists = ProductList.initializeProductLists(json);
    productMenu.productMenuLists = ProductMenuList.initializeProductMenuLists(json);

    return productMenu;
  }

  static initializeProductMenus(jsonUser: {productMenus: ProductMenu[]}): ProductMenu[] {
    let productMenus: ProductMenu[] = [];
    if (jsonUser.productMenus) {
      for (let productMenu of jsonUser.productMenus) {
        productMenus.push(ProductMenu.fromJson(productMenu));
      }
    }
    return productMenus;
  }
}

