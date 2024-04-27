import {ModalService} from "./modal.service";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: `root`
})
export class UploadPfpModalService extends ModalService {
  constructor() {
    super();
  }

}
