import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DeliveryPerson} from "../../../../model/user/delivery.person";
import {CookieComponent} from "../../../misc/cookie-component";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faCamera, faPen, faTrash, faUser} from "@fortawesome/free-solid-svg-icons";
import {CurrentUserService} from "../../../../service/user/current-user.service";
import {DeliveryPersonService} from "../../../../service/user/delivery-person.service";
import {DeliveryServiceService} from "../../../../service/user/delivery-service.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-delivery-person',
  standalone: true,
  imports: [
    FaIconComponent,
    NgIf
  ],
  templateUrl: './delivery-person-element.component.html',
  styleUrl: './delivery-person-element.component.scss'
})
export class DeliveryPersonElementComponent extends CookieComponent implements OnInit {
  faUser = faUser;
  faPen = faPen;
  faCamera = faCamera;
  faTrash = faTrash;

  memberSince: string = "";

  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  @Input() deliveryPerson: DeliveryPerson | undefined;
  @Output() onEditDeliveryPersonEmitter = new EventEmitter<DeliveryPerson>();
  @Output() onDeleteDeliveryPersonEmitter = new EventEmitter<DeliveryPerson>();
  @Output() onEditImgPfpEmitter = new EventEmitter<DeliveryPerson>();

  constructor(protected override deliveryServiceService: DeliveryServiceService,
              protected override deliveryPersonService: DeliveryPersonService,
              protected override currentUserService: CurrentUserService) {
    super();
  }

  ngOnInit(): void {
    let date: Date = new Date(this.deliveryPerson?.registrationDate!)
    this.memberSince = date.toLocaleDateString(undefined, this.options);
  }

  onEditDeliveryPerson() {
    this.onEditDeliveryPersonEmitter.emit(this.deliveryPerson);
  }

  onEditImgPfp() {
    this.onEditImgPfpEmitter.emit(this.deliveryPerson);
  }

  onDeleteDeliveryPerson() {
    this.onDeleteDeliveryPersonEmitter.emit(this.deliveryPerson);
  }
}
