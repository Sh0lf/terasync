import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgIf} from "@angular/common";
import {InternalObjectService} from "../../service/misc/internal-object.service";
import {ModalService} from "../../service/misc/modal.service";
import {ModalComponent} from "../misc/modal-component";
import {UploadPfpModalService} from "../../service/misc/upload-pfp-modal.service";

@Component({
  selector: 'app-upload-pfp',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './upload-pfp.component.html',
  styleUrl: './upload-pfp.component.css'
})
export class UploadPfpComponent extends ModalComponent<UploadPfpModalService> {

  constructor(protected override modalService: UploadPfpModalService) {
    super();
  }
}
