import {Component, ElementRef, OnInit} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {faBurger, faPlus} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {ActivatedRoute, Router} from "@angular/router";
import {NgForOf} from "@angular/common";
import {HttpErrorResponse, HttpEvent, HttpEventType} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {UploadPfpModalComponent} from "../upload-pfp-modal/upload-pfp-modal.component";
import {CookieComponent} from "../../misc/cookie-component";
import {ModalOpenType} from "../../misc/modal-open-type";
import {Product} from "../../../model/odSystem/product";
import {ProductImageService} from "../../../service/odSystem/product-image.service";
import {BusinessService} from "../../../service/user/business.service";
import {CurrentUserService} from "../../../service/user/current-user.service";
import {businessCategory} from "../../../service/user/userCategories";
import {AddEditProductModalComponent} from "./add-edit-product-modal/add-edit-product-modal.component";
import {ProductElementComponent} from "./product-element/product-element.component";

@Component({
  selector: 'app-manage-products',
  standalone: true,
  imports: [
    FaIconComponent,
    UploadPfpModalComponent,
    AddEditProductModalComponent,
    NgForOf,
    ProductElementComponent,
    FormsModule
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
  searchProduct: string = "";

  constructor(private productImageService: ProductImageService,
              private el: ElementRef,
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

    this.el.nativeElement.style.width = `100%`;
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
    this.currentUserService.user?.products!.forEach((product: Product) => {
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

  getCurrentProducts(): Product[] {
    return this.currentUserService.user?.products!.filter((product) => {
      return product.name.toLowerCase().includes(this.searchProduct.toLowerCase());
    })!;
  }
}
