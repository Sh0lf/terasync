import { Component } from '@angular/core';
import {NgIf} from "@angular/common";
import {ModalComponent} from "../misc/modal-component";
import {ModalService} from "../../service/misc/modal.service";
import {TestModalService} from "../../service/misc/test-modal.service";

@Component({
  selector: 'app-test-modal',
  standalone: true,
    imports: [
        NgIf
    ],
  templateUrl: './test-modal.component.html',
  styleUrl: './test-modal.component.css'
})
export class TestModalComponent extends ModalComponent<TestModalService> {

    constructor(protected override modalService: TestModalService) {
      super();
    }
}
