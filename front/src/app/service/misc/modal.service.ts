import {InternalObjectService} from "./internal-object.service";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: `root`
})
export class ModalService extends InternalObjectService<{isModalOpen: boolean}> {
  constructor() {
    super();

    this.setObject({isModalOpen: false});
  }

  openModal() {
    this.setObject({isModalOpen: true});
  }

  closeModal() {
    this.setObject({isModalOpen: false});
  }
}
