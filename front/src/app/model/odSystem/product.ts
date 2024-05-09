import {ProductList} from "./product.list";
import {ProductImage} from "./product.image";
import {CustomerOrderList} from "./customer.order.list";

export class Product {
  productId: number | undefined;
  name: string;
  vegan: boolean;
  price: number;
  businessId: number;
  creationTime: string | undefined;
  description: string | undefined

  productLists: ProductList[] = [];
  productImages: ProductImage[] = [];
  customerOrderLists: CustomerOrderList[] = [];

  constructor(name: string, isVegan: boolean, price: number, businessId: number,
              description?: string, creationTime?: string, productId?: number) {
    this.productId = productId;
    this.name = name;
    this.description = description;
    this.vegan = isVegan;
    this.price = price;
    this.creationTime = creationTime;
    this.businessId = businessId;
  }

  public static fromJson(json: Product): Product {
    let product= new Product(json.name, json.vegan, json.price, json.businessId,
      json.description, json.creationTime, json.productId);

    product.productLists = ProductList.initializeProductLists(json);
    product.productImages = ProductImage.initializeProductImages(json);
    // product.customerOrderLists = CustomerOrderList.initializeCustomerOrderLists(json);

    return product;
  }

  static initializeProducts(jsonUser: {products: Product[] | undefined}): Product[] {
    let products: Product[] = [];
    if (jsonUser.products != undefined) {
      for (let product of jsonUser.products) {
        products.push(Product.fromJson(product));
      }
    }
    return products;
  }
}
