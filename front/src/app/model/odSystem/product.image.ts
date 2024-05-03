export class ProductImage {
  productImageId: number | undefined;
  name: string;
  path: string;
  productId: number;
  description: string | undefined;

  imageUrl: string | undefined;
  mightDelete: boolean = false;

  constructor(name: string, path: string, productId: number, description?: string, productImageId?: number) {
    this.productImageId = productImageId;
    this.name = name;
    this.description = description;
    this.path = path;
    this.productId = productId;
  }

  public static fromJson(json: ProductImage): ProductImage {
    return new ProductImage(json.name, json.path, json.productId,
      json.description, json.productImageId);
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
