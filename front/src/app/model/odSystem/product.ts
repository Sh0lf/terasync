import {ProductList} from "./product.list";
import {ProductImage} from "./product.image";
import {CustomerOrderList} from "./customer.order.list";

export class Product {
  productId: number | undefined;
  name: string;
  description: string;
  isVegan: boolean;
  price: number;
  creationTime: string;
  businessId: number;

  productLists: ProductList[] = [];
  productImages: ProductImage[] = [];
  customerOrderLists: CustomerOrderList[] = [];

  constructor(name: string, description: string, isVegan: boolean, price: number,
              creationTime: string, businessId: number, productId?: number) {
    this.productId = productId;
    this.name = name;
    this.description = description;
    this.isVegan = isVegan;
    this.price = price;
    this.creationTime = creationTime;
    this.businessId = businessId;
  }

  public static fromJson(json: Product): Product {
    let product= new Product(json.name, json.description, json.isVegan, json.price,
      json.creationTime, json.businessId, json.productId);

    product.productLists = ProductList.initializeProductLists(json);
    product.productImages = ProductImage.initializeProductImages(json);
    product.customerOrderLists = CustomerOrderList.initializeCustomerOrderLists(json);

    return product;
  }

  static initializeProducts(jsonUser: {products: Product[]}): Product[] {
    let products: Product[] = [];
    if (jsonUser.products) {
      for (let product of jsonUser.products) {
        products.push(Product.fromJson(product));
      }
    }
    return products;
  }
}
