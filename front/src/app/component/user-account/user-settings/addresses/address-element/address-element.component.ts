import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CookieComponent} from "../../../../misc/cookie-component";
import {CookieService} from "ngx-cookie-service";
import {CurrentUserService} from "../../../../../service/user/current-user.service";
import {Address} from "../../../../../model/odSystem/address";
import {NgIf} from "@angular/common";
import {AddressService} from "../../../../../service/odSystem/address.service";
import {HttpErrorResponse} from "@angular/common/http";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faPen, faPenToSquare, faStar, faTrash, faXmark} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-address-element',
  standalone: true,
  imports: [
    NgIf,
    FaIconComponent
  ],
  templateUrl: './address-element.component.html',
  styleUrl: './address-element.component.scss'
})
export class AddressElementComponent extends CookieComponent {
  @Input() address!: Address | undefined;
  @Input() addresses!: Address[] | undefined;

  @Output() newAddressEvent = new EventEmitter<Address>();

  faStar = faStar;
  faPen = faPen;
  faTrash = faTrash;

  constructor(protected addressService: AddressService,
              protected override currentUserService: CurrentUserService,
              protected override cookieService: CookieService) {
    super();
  }

  onDefaultOnClick() {
    let currentDefaultAddress = this.currentUserService.getDefaultAddress();
    if (currentDefaultAddress) {
      currentDefaultAddress.setDefaultAddress(false);
      this.addressService.updateEntity(currentDefaultAddress).subscribe({
        next: (address: Address) => {
          console.log("Old default address updated");
        },
        error: (error: HttpErrorResponse) => {
          console.log("HTTP ERROR: Old address not updated")
        }
      });
    }
    if (this.address != undefined) {
      this.address.setDefaultAddress(true);
      this.addressService.updateEntity(this.address).subscribe({
        next: (address: Address) => {
          console.log(address);
          console.log("New default address updated");
        },
        error: (error: HttpErrorResponse) => {
          console.log("HTTP ERROR: New address not updated")
        }
      });
    }
  }

  onDelete() {
    if (this.address != undefined) {
      this.addressService.deleteEntity(this.address?.addressId!).subscribe({
        next: () => {
          console.log("Address deleted");
          this.addresses?.splice(this.addresses.indexOf(this.address!), 1);

          this.checkForDefaultAddress();
        },
        error: () => {
          console.log("HTTP ERROR: Address not deleted")
        }
      });
    }
  }

  private checkForDefaultAddress() {
    let currentDefaultAddress: Address | undefined = this.currentUserService.getDefaultAddress();

    if(currentDefaultAddress == undefined &&
      this.currentUserService.user?.addresses != undefined &&
      this.currentUserService.user?.addresses.length > 0) {
      let newDefaultAddress = this.currentUserService.user?.addresses[0];
      newDefaultAddress.setDefaultAddress(true);
      this.addressService.updateEntity(newDefaultAddress).subscribe({
        next: (address: Address) => {
          console.log(address);
          console.log("No default address detected, updated first address as default");
        },
        error: (error: HttpErrorResponse) => {
          console.log("HTTP ERROR: New address not updated")
        }
      });
    }
  }

  modifyOnClick() {
    this.newAddressEvent.emit(this.address);
  }
}
