package isep.webapp.terasync.controller.user;

import isep.webapp.terasync.model.user.DeliveryPerson;
import isep.webapp.terasync.service.user.DeliveryPersonService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/delivery-person")
public class DeliveryPersonController extends UserController<DeliveryPerson, DeliveryPersonService> {
    protected DeliveryPersonController(DeliveryPersonService entityService) {
        super(entityService);
    }
}
