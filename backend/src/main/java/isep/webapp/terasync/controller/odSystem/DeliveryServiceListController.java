package isep.webapp.terasync.controller.odSystem;

import isep.webapp.terasync.controller.EntityController;
import isep.webapp.terasync.model.odSystem.DeliveryServiceList;
import isep.webapp.terasync.service.odSystem.DeliveryServiceListService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/delivery-service-list")
public class DeliveryServiceListController extends EntityController<DeliveryServiceList, DeliveryServiceListService> {
    protected DeliveryServiceListController(DeliveryServiceListService entityService) {
        super(entityService);
    }
}
