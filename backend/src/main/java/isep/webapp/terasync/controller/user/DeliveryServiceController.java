package isep.webapp.terasync.controller.user;

import isep.webapp.terasync.model.user.DeliveryService;
import isep.webapp.terasync.service.user.DeliveryServiceService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/delivery-service")
public class DeliveryServiceController extends UserController<DeliveryService, DeliveryServiceService> {

    protected DeliveryServiceController(DeliveryServiceService entityService) {
        super(entityService);
    }
}
