import {Component, OnInit} from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faPlus, faTimes, faXmark} from "@fortawesome/free-solid-svg-icons";
import {FooterComponent} from "../footer/footer.component";
import {CookieComponent} from "../misc/cookie-component";
import {NgxResizeObserverModule} from "ngx-resize-observer";
import {CustomerService} from "../../service/user/customer.service";
import {BusinessService} from "../../service/user/business.service";
import {AdminService} from "../../service/user/admin.service";
import {DeliveryServiceService} from "../../service/user/delivery-service.service";
import {DeliveryPersonService} from "../../service/user/delivery-person.service";
import {CookieService} from "ngx-cookie-service";
import {CurrentUserService} from "../../service/user/current-user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {AddressService} from "../../service/odSystem/address.service";
import {Address} from "../../model/odSystem/address";
import {AddressElementComponent} from "./address-element/address-element.component";

@Component({
  selector: 'app-addresses',
  standalone: true,
  imports: [
    FaIconComponent,
    FooterComponent,
    NgxResizeObserverModule,
    FormsModule,
    NgIf,
    NgForOf,
    AddressElementComponent
  ],
  templateUrl: './addresses.component.html',
  styleUrl: './addresses.component.scss'
})
export class AddressesComponent extends CookieComponent implements OnInit {
  faPlus = faPlus;
  faXmark = faXmark;

  // Input Fields
  countryInput: string = '';
  streetInput: string = '';
  postalCodeInput: string = '';
  cityInput: string = '';
  infoInput: string = '';

  // Logic Fields
  isAddingAddress: boolean = false;
  isEditingAddress: boolean = false;
  editingAddress!: Address | undefined;

  constructor(protected override customerService: CustomerService,
              protected override businessService: BusinessService,
              protected override adminService: AdminService,
              protected override deliveryServiceService: DeliveryServiceService,
              protected override deliveryPersonService: DeliveryPersonService,
              protected override cookieService: CookieService,
              protected override currentUserService: CurrentUserService,
              private addressService: AddressService,
              protected override router: Router, protected override route: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.initializeUserByToken().then(() => {
      this.customerPage();
    });
  }

  toggleOnClick() {
    this.isAddingAddress = !this.isAddingAddress;
    this.isEditingAddress = !this.isEditingAddress;
  }

  saveOnClick() {
    let defaultAddress = false;
    if(this.currentUserService.user?.addresses.length == 0) {
      defaultAddress = true;
    }

    if(this.isAddingAddress) {
      let newAddress = new Address(this.currentUserService.user?.userId!,
        this.countryInput,
        this.streetInput,
        this.postalCodeInput,
        this.cityInput,
        this.infoInput,
        defaultAddress)

      this.addressService.addEntity(newAddress).subscribe({
        next: (address: Address) => {
          this.currentUserService.user?.addresses.push(Address.fromJson(address));
          this.resetValues();
          console.log("New Address Added!");
        },
        error: (error: any) => {
          console.log("Error in adding new address")
        }
      })
    } else if(this.isEditingAddress && this.editingAddress != undefined) {
      this.editingAddress.country = this.countryInput;
      this.editingAddress.street = this.streetInput;
      this.editingAddress.postalCode = this.postalCodeInput;
      this.editingAddress.city = this.cityInput;
      this.editingAddress.info = this.infoInput;

      this.addressService.updateEntity(this.editingAddress).subscribe({
        next: (address: Address) => {
          this.resetValues();
          console.log("Address Updated Added!");
        },
        error: (error: any) => {
          console.error("Error in updating address");
        }
      });
    }
  }

  private resetValues() {
    this.isAddingAddress = false;
    this.isEditingAddress = false;
    this.editingAddress = undefined;

    this.countryInput = '';
    this.streetInput = '';
    this.postalCodeInput = '';
    this.cityInput = '';
    this.infoInput = '';
  }

  editAddress(address: Address) {
    this.countryInput = address.country;
    this.streetInput = address.street;
    this.postalCodeInput = address.postalCode;
    this.cityInput = address.city;
    this.infoInput = address.info;

    this.isEditingAddress = true;
    this.editingAddress = address;
  }

  isEnabled() {
    return this.isAddingAddress || this.isEditingAddress;
  }
}
