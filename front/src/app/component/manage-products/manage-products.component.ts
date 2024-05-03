import {Component, OnInit} from '@angular/core';
import {CookieComponent} from "../misc/cookie-component";
import {CookieService} from "ngx-cookie-service";
import {businessCategory} from "../../service/user/userCategories";
import {faBurger, faPlus} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {CurrentUserService} from "../../service/user/current-user.service";
import {BusinessService} from "../../service/user/business.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UploadPfpModalComponent} from "../user-account/upload-pfp-modal/upload-pfp-modal.component";
import {AddEditProductModalComponent} from "./add-edit-product-modal/add-edit-product-modal.component";
import {ModalOpenType} from "../misc/modal-open-type";
import {NgForOf} from "@angular/common";
import {ProductElementComponent} from "./product-element/product-element.component";
import {HttpErrorResponse, HttpEvent, HttpEventType} from "@angular/common/http";
import {Product} from "../../model/odSystem/product";
import {ProductImageService} from "../../service/odSystem/product-image.service";

@Component({
  selector: 'app-manage-products',
  standalone: true,
  imports: [
    FaIconComponent,
    UploadPfpModalComponent,
    AddEditProductModalComponent,
    NgForOf,
    ProductElementComponent
  ],
  templateUrl: './manage-products.component.html',
  styleUrl: './manage-products.component.scss'
})
export class ManageProductsComponent extends CookieComponent implements OnInit {
  faBurger = faBurger;
  faPlus = faPlus;

  isModalOpen: boolean = false;
  modalOpenType: ModalOpenType = ModalOpenType.NONE;

  editingProduct!: Product;

  constructor(private productImageService: ProductImageService,
              protected override businessService: BusinessService,
              protected override currentUserService: CurrentUserService,
              protected override cookieService: CookieService,
              protected override router: Router, protected override route: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.initializeUserByToken().then(() => {
      this.specificUserPage(businessCategory)
      this.initializeProductImages();
    });
  }

  openModal(modalOpenType: ModalOpenType) {
    this.isModalOpen = true;
    this.modalOpenType = modalOpenType;
  }

  addProduct() {
    this.editingProduct = new Product("", false, 0, this.currentUserService.user?.userId!, "");
    this.openModal(ModalOpenType.ADD);
  }

  editProduct(product: Product) {
    this.editingProduct = product;
    this.openModal(ModalOpenType.EDIT);
  }

  onChangeEmitter(isModalOpen: boolean) {
    this.isModalOpen = isModalOpen;
  }

  initializeProductImages() {
    this.currentUserService.user?.products.forEach((product: Product) => {
      product.productImages.forEach((productImage) => {
        this.productImageService.downloadFiles(productImage.path).subscribe({
          next: (httpEvent: HttpEvent<Blob>) => {
            if (httpEvent.type === HttpEventType.Response) {
              const file: File = new File([httpEvent.body!], httpEvent.headers.get('File-Name')!,
                {type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`});

              productImage.imageUrl = URL.createObjectURL(file);
            }
          },
          error: (error: HttpErrorResponse) => {
            console.log("Error downloading file");
          }
        });
      });
    });
  }
}
