import {ModalService} from "../../service/misc/modal.service";

export class ModalComponent<T extends ModalService> {
    protected modalService: T;

    constructor() {
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
