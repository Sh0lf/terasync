import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {faCheck, faTrash, faXmark} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {NgForOf, NgIf} from "@angular/common";
import {ModalComponent} from "../../misc/modal-component";
import {FormsModule} from "@angular/forms";
import {ModalOpenType} from "../../misc/modal-open-type";
import {CurrentUserService} from "../../../service/user/current-user.service";
import {CustomerService} from "../../../service/user/customer.service";
import {BusinessService} from "../../../service/user/business.service";
import {AdminService} from "../../../service/user/admin.service";
import {DeliveryServiceService} from "../../../service/user/delivery-service.service";
import {DeliveryPersonService} from "../../../service/user/delivery-person.service";
import {CookieService} from "ngx-cookie-service";
import {EmailService} from "../../../service/misc/email.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UploadStatus} from "../../misc/form-component";
import {HttpErrorResponse} from "@angular/common/http";
import {ProductService} from "../../../service/odSystem/product.service";
import {Product} from "../../../model/odSystem/product";
import {ProductImage} from "../../../model/odSystem/product.image";

@Component({
  selector: 'app-add-edit-product-modal',
  standalone: true,
  imports: [
    FaIconComponent,
    NgIf,
    FormsModule,
    NgForOf
  ],
  templateUrl: './add-edit-product-modal.component.html',
  styleUrl: './add-edit-product-modal.component.scss'
})
export class AddEditProductModalComponent extends ModalComponent {
  @Input() override isModalOpen = false
  @Output() override onChangeEmitter = new EventEmitter<boolean>()

  faXmark = faXmark;
  faCheck = faCheck;

  files: File[] = [];
  imgUrls: string[] = [];
  statusMsg: string = "";

  nameInput: string = "";
  descriptionInput: string = "";
  isVeganInput: boolean = false;
  priceInput: number = 0;

  @ViewChild('imageInput') imageInput!: ElementRef;
  @Input() modalOpenType: ModalOpenType = ModalOpenType.NONE;

  constructor(private productService: ProductService,
              protected override cookieService: CookieService,
              protected override currentUserService: CurrentUserService,
              protected override router: Router, protected override route: ActivatedRoute) {
    super();
  }

  override isFormValid(): boolean {
    let checkedFileTypes: boolean = false;

    for (let i = 0; i < this.files.length; i++) {
      checkedFileTypes = this.files[i].type == 'image/png' || this.files[i].type == 'image/jpeg';
      if (!checkedFileTypes) break;
    }

    return this.nameInput.length > 0 &&
      this.descriptionInput.length > 0 &&
      this.priceInput > 0 &&
      this.files.length > 0 &&
      checkedFileTypes
  }

  onImageSelected(event: any) {
    for (let i = 0; i < event.target.files.length; i++) {
      this.files.push(event.target.files[i]);
      this.imgUrls.push(URL.createObjectURL(this.files[i]))
    }

    console.log(this.imageInput.nativeElement.cou);
  }

  onAcceptClick() {
    if(!this.isFormValid()) {
      this.statusMsg = "Invalid form data!";
      return;
    }

    let product: Product = new Product(this.nameInput, this.isVeganInput,
      this.priceInput, this.currentUserService.user?.userId!, this.descriptionInput);

    this.productService.addEntity(product).subscribe({
      next: (product: Product) => {
        this.uploadProductImages(Product.fromJson(product));
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
      }
    });
  }

  uploadProductImages(product: Product) {
    let formData = new FormData();
    for (let i = 0; i < this.files.length; i++) {
      let newFileName = `${product.productId}-${i}-${this.files[i].name}`
      formData.append('files', this.files[i], newFileName);
    }

    this.uploadFiles(this.productService, formData).subscribe({
      next: (uploadStatus: UploadStatus) => {
        this.statusMsg = uploadStatus.statusMsg;
        if(uploadStatus.isSuccessful) {
          this.currentUserService.user?.products?.push(product);
          this.resetValues();
        }
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
      }
    });
  }

  private resetValues() {
    this.nameInput = "";
    this.descriptionInput = "";
    this.isVeganInput = false;
    this.priceInput = 0;
    this.files = [];
    this.imgUrls = [];
  }

  protected readonly faTrash = faTrash;

  onDeleteImage(imgUrl: string) {
    let index = this.imgUrls.indexOf(imgUrl);
    this.imgUrls.splice(index, 1);
    this.files.splice(index, 1);

  }
}
