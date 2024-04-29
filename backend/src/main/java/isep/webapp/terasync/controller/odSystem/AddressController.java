package isep.webapp.terasync.controller.odSystem;

import isep.webapp.terasync.controller.EntityController;
import isep.webapp.terasync.model.odSystem.Address;
import isep.webapp.terasync.service.odSystem.AddressService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/address")
public class AddressController extends EntityController<Address, AddressService> {
    protected AddressController(AddressService entityService) {
        super(entityService, Address.class);
    }
}
