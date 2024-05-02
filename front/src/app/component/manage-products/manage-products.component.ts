import {Component, OnInit} from '@angular/core';
import {CookieComponent} from "../misc/cookie-component";
import {CookieService} from "ngx-cookie-service";
import {businessCategory} from "../../service/user/userCategories";
import {faBurger, faLocationDot, faPen, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {CurrentUserService} from "../../service/user/current-user.service";
import {BusinessService} from "../../service/user/business.service";
import {CustomerService} from "../../service/user/customer.service";
import {AdminService} from "../../service/user/admin.service";
import {DeliveryServiceService} from "../../service/user/delivery-service.service";
import {DeliveryPersonService} from "../../service/user/delivery-person.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UploadPfpModalComponent} from "../user-account/upload-pfp-modal/upload-pfp-modal.component";
import {AddEditProductModalComponent} from "./add-edit-product-modal/add-edit-product-modal.component";
import {ModalOpenType} from "../misc/modal-open-type";
import {NgForOf} from "@angular/common";
import {ProductElementComponent} from "./product-element/product-element.component";

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
  faPen = faPen;
  faTrash = faTrash;
  faPlus = faPlus;

  isModalOpen: boolean = false;
  modalOpenType: ModalOpenType = ModalOpenType.NONE;
  ModalOpenType = ModalOpenType;


  constructor(protected override customerService: CustomerService,
              protected override businessService: BusinessService,
              protected override adminService: AdminService,
              protected override deliveryServiceService: DeliveryServiceService,
              protected override deliveryPersonService: DeliveryPersonService,
              protected override currentUserService: CurrentUserService,
              protected override cookieService: CookieService,
              protected override router: Router, protected override route: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.initializeUserByToken().then(() => {
      this.specificUserPage(businessCategory)
    })
  }

  openModal(modalOpenType: ModalOpenType) {
    this.isModalOpen = true;
    this.modalOpenType = modalOpenType;
  }

  onChangeEmitter(isModalOpen: boolean) {
    this.isModalOpen = isModalOpen;
  }

}
