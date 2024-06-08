import {Component, ElementRef, OnInit} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {faBurger, faPlus} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {ActivatedRoute, Router} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {UploadPfpModalComponent} from "../upload-pfp-modal/upload-pfp-modal.component";
import {CookieComponent} from "../../misc/cookie-component";
import {ModalOpenType} from "../../misc/modal-open-type";
import {Product} from "../../../model/odSystem/product";
import {ProductImageService} from "../../../service/odSystem/product-image.service";
import {BusinessService} from "../../../service/user/business.service";
import {CurrentUserService} from "../../../service/user/current-user.service";
import {adminCategory, businessCategory} from "../../../service/user/userCategories";
import {AddEditProductModalComponent} from "./add-edit-product-modal/add-edit-product-modal.component";
import {ProductElementComponent} from "./product-element/product-element.component";
import {ProductService} from "../../../service/odSystem/product.service";
import {Business} from "../../../model/user/business";

@Component({
  selector: 'app-manage-products',
  standalone: true,
  imports: [
    FaIconComponent,
    UploadPfpModalComponent,
    AddEditProductModalComponent,
    NgForOf,
    ProductElementComponent,
    FormsModule,
    NgIf
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

  businesses: Business[] = [];
  selectedBusinessId: number | undefined;

  constructor(private el: ElementRef,
              protected override productImageService: ProductImageService,
              protected override productService: ProductService,
              protected override businessService: BusinessService,
              protected override currentUserService: CurrentUserService,
              protected override cookieService: CookieService,
              protected override router: Router, protected override route: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.initializeUserByToken().then(() => {
      this.specificUserPage(businessCategory, adminCategory).then()
      if (this.isAdminCategory()) {
        this.initializeAdminProducts().then(businesses => {
          this.initializeProductImages(this.currentUserService.user?.products!);
          this.businesses = businesses;
        });
      } else {
        this.initializeProductImages(this.currentUserService.user?.products!);
      }
    });

    this.el.nativeElement.style.width = `100%`;
  }

  openModal(modalOpenType: ModalOpenType) {
    this.isModalOpen = true;
    this.modalOpenType = modalOpenType;
  }

  addProduct() {
    let businessId = this.currentUserService.user?.businessId!;
    if (this.isAdminCategory() && this.businesses.length > 0) {
      businessId = this.selectedBusinessId!;
      if (businessId == undefined) {
        businessId = this.businesses[0].businessId!;
      }
    }

    this.editingProduct = new Product("", false, 0, businessId, "");
    this.openModal(ModalOpenType.ADD);
  }

  editProduct(product: Product) {
    this.editingProduct = product;
    this.openModal(ModalOpenType.EDIT);
  }

  onChangeEmitter(isModalOpen: boolean) {
    this.isModalOpen = isModalOpen;
  }

  getFilteredProducts(): Product[] {
    return this.currentUserService.user?.products!.filter((product) => {
      return product.name.toLowerCase().includes(this.searchProduct.toLowerCase()) &&
        (this.selectedBusinessId == undefined || product.businessId == this.selectedBusinessId);
    })!;
  }

  clearFilters() {
    this.selectedBusinessId = undefined;
    this.searchProduct = "";
  }
}
