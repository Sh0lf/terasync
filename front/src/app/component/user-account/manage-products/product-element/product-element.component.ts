import {Component, EventEmitter, Input, Output} from '@angular/core';
import {faPen, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {IMAGE_CONFIG, NgForOf, NgOptimizedImage} from "@angular/common";
import {CookieService} from "ngx-cookie-service";
import {AddEditProductModalComponent} from "../add-edit-product-modal/add-edit-product-modal.component";
import {HttpErrorResponse} from "@angular/common/http";
import {CookieComponent} from "../../../misc/cookie-component";
import { ModalOpenType } from '../../../misc/modal-open-type';
import {Product} from "../../../../model/odSystem/product";
import {ProductService} from "../../../../service/odSystem/product.service";
import {ProductImageService} from "../../../../service/odSystem/product-image.service";
import {CustomerOrderListService} from "../../../../service/odSystem/customer-order-list.service";
import {ProductListService} from "../../../../service/odSystem/product-list.service";
import {BusinessService} from "../../../../service/user/business.service";
import {CurrentUserService} from "../../../../service/user/current-user.service";

@Component({
  selector: 'app-product-element',
  standalone: true,
  imports: [
    FaIconComponent,
    NgForOf,
    NgOptimizedImage,
    AddEditProductModalComponent
  ],
  providers: [
    {
      provide: IMAGE_CONFIG,
      useValue: {
        disableImageSizeWarning: true,
        disableImageLazyLoadWarning: true
      }
    },
  ],
  templateUrl: './product-element.component.html',
  styleUrl: './product-element.component.scss'
})
export class ProductElementComponent extends CookieComponent {

  faTrash = faTrash;
  faPen = faPen;

  @Input() product!: Product | undefined;
  @Output() onEditEmitter = new EventEmitter<void>();

  constructor(private productImageService: ProductImageService,
              private customerOrderListService: CustomerOrderListService,
              private productListService: ProductListService,
              protected override productService: ProductService,
              protected override businessService: BusinessService,
              protected override currentUserService: CurrentUserService,
              protected override cookieService: CookieService) {
    super();
  }

  openModal() {
    this.onEditEmitter.emit();
  }

  deleteProduct() {
    if (this.product != undefined) {
      // DELETE THE IMAGES
      this.product.productImages.forEach((productImage) => {
        this.productImageService.deleteFile(productImage.path!).subscribe({
          next: () => {
            console.log("Product image deleted with id: " + productImage.productImageId);
          },
          error: (error: HttpErrorResponse) => {
            console.error(error);
          }
        });
      })

      // DELETE THE PRODUCT -> TAKES CARE OF ASSOCIATED PRODUCT IMAGES
      this.productService.deleteEntity(this.product.productId!).subscribe({
        next: () => {
          this.currentUserService.user?.products!.splice(this.currentUserService.user?.products!.indexOf(this.product!), 1);
          console.log("Product deleted with id: " + this.product?.productId);
        },
        error: (error: HttpErrorResponse) => {
          console.error(error);
        }
      });

      // DELETE ASSOCIATED CUSTOMER ORDER LISTS
      this.customerOrderListService.deleteByProductId(this.product.productId!).subscribe({
        next: () => {
          console.log("Customer order lists deleted for product with id: " + this.product?.productId);
        },
        error: (error: HttpErrorResponse) => {
          console.error(error);
        }
      });

      // DELETE ASSOCIATED PRODUCT LISTS
      this.productListService.deleteByProductId(this.product.productId!).subscribe({
        next: () => {
          console.log("Product lists deleted for product with id: " + this.product?.productId);
        },
        error: (error: HttpErrorResponse) => {
          console.error(error);
        }
      });
    }
  }
}
