import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ModalOpenType} from "../../misc/modal-open-type";
import {faPen, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {Product} from "../../../model/odSystem/product";
import {CookieComponent} from "../../misc/cookie-component";
import {IMAGE_CONFIG, NgForOf, NgOptimizedImage} from "@angular/common";
import {CookieService} from "ngx-cookie-service";
import {CurrentUserService} from "../../../service/user/current-user.service";
import {BusinessService} from "../../../service/user/business.service";
import {ProductService} from "../../../service/odSystem/product.service";
import {AddEditProductModalComponent} from "../add-edit-product-modal/add-edit-product-modal.component";
import {HttpErrorResponse} from "@angular/common/http";
import {ProductImageService} from "../../../service/odSystem/product-image.service";

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

  ModalOpenType = ModalOpenType;
  faTrash = faTrash;
  faPen = faPen;

  @Input() product!: Product | undefined;
  @Output() onEditEmitter = new EventEmitter<void>();

  constructor(private productService: ProductService,
              private productImageService: ProductImageService,
              protected override businessService: BusinessService,
              protected override currentUserService: CurrentUserService,
              protected override cookieService: CookieService) {
    super();
  }

  openModal() {
    this.onEditEmitter.emit();
  }

  deleteProduct() {
    if(this.product != undefined) {
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

      this.productService.deleteEntity(this.product.productId!).subscribe({
        next: () => {
          this.currentUserService.user?.products.
          splice(this.currentUserService.user?.products.indexOf(this.product!), 1);
          console.log("Product deleted with id: " + this.product?.productId);
        },
        error: (error: HttpErrorResponse) => {
          console.error(error);
        }
      });
    }
  }
}
