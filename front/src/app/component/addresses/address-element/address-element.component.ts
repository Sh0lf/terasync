import {Component, Input} from '@angular/core';
import {CookieComponent} from "../../misc/cookie-component";
import {CookieService} from "ngx-cookie-service";
import {CurrentUserService} from "../../../service/user/current-user.service";
import {Address} from "../../../model/odSystem/address";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-address-element',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './address-element.component.html',
  styleUrl: './address-element.component.scss'
})
export class AddressElementComponent extends CookieComponent {
  @Input() address!: Address | undefined;

  constructor(protected override currentUserService: CurrentUserService,
              protected override cookieService: CookieService) {
    super();
  }
}
