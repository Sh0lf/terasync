import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgIf} from "@angular/common";
import {ConnectionSecurityElementComponent} from "../connection-security-element/connection-security-element.component";
import {ModalComponent} from "../../../misc/modal-component";
import {User} from "../../../../model/user/user";
import {UserService} from "../../../../service/user/user.service";
import {UserCategory} from "../../../../service/user/userCategories";
import {EditingUserType} from "../connection-security-field/editable-element";

@Component({
  selector: 'app-connection-security-modal',
  standalone: true,
  imports: [
    NgIf,
    ConnectionSecurityElementComponent
  ],
  templateUrl: './connection-security-modal.component.html',
  styleUrl: './connection-security-modal.component.css'
})
export class ConnectionSecurityModalComponent extends ModalComponent {
  @Input() override isModalOpen = false
  @Output() override onChangeEmitter = new EventEmitter<boolean>()

  @Input() editingUser!: User;
  @Input() editingUserService!: UserService<any>;
  @Input() editingUserCategory!: UserCategory;
  @Input() editingUserType: EditingUserType = EditingUserType.USER;

  override isFormValid(): boolean {
    throw new Error('Method not implemented.');
  }

  constructor() {
    super();
  }

  onCloseModal(isModalOpen: boolean) {
    this.isModalOpen = isModalOpen;
    this.onChangeEmitter.emit(isModalOpen);
  }
}