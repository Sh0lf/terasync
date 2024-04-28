import {ModalService} from "../../service/misc/modal.service";
import {CookieComponent} from "./cookie-component";

export class ModalComponent<T extends ModalService> extends CookieComponent {
    protected modalService!: T;

    constructor() {
        super();
    }

    openModal() {
        this.modalService.openModal();
    }

    closeModal() {
        this.modalService.closeModal();
    }

    isModalOpen(): boolean {
        return this.modalService.getObject().isModalOpen;
    }
}
