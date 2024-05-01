export class ProductImage {
  productImageId: number | undefined;
  name: string;
  description: string;
  path: string;
  productId: number;


  constructor(name: string, description: string, path: string, productId: number, productImageId?: number) {
    this.productImageId = productImageId;
    this.name = name;
    this.description = description;
    this.path = path;
    this.productId = productId;
  }

  public static fromJson(json: ProductImage): ProductImage {
    return new ProductImage(json.name, json.description, json.path, json.productId, json.productImageId);
  }

  static initializeProductImages(json: {productImages: ProductImage[]}) {
    let productImages: ProductImage[] = [];
    if (json.productImages) {
      for (let productImage of json.productImages) {
        productImages.push(ProductImage.fromJson(productImage));
      }
    }
    return productImages;
  }
}
