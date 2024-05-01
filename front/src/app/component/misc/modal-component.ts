import {CookieComponent} from "./cookie-component";
import {EventEmitter, Input, Output} from "@angular/core";

export class ModalComponent extends CookieComponent {
  isModalOpen: boolean = false;
  onChangeEmitter = new EventEmitter<boolean>();

  constructor() {
    super();
  }

  closeModal() {
    this.isModalOpen = false;
    this.onChangeEmitter.emit(this.isModalOpen);
  }
}
