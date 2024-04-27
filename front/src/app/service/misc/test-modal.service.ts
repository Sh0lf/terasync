import {ModalService} from "./modal.service";
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: `root`
})
export class TestModalService extends ModalService {
    constructor() {
        super();
    }

}
