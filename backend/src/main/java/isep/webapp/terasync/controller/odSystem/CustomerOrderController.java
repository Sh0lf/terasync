package isep.webapp.terasync.controller.odSystem;

import isep.webapp.terasync.controller.EntityController;
import isep.webapp.terasync.model.odSystem.CustomerOrder;
import isep.webapp.terasync.service.odSystem.CustomerOrderService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/customer-order")
public class CustomerOrderController extends EntityController<CustomerOrder, CustomerOrderService> {

    protected CustomerOrderController(CustomerOrderService entityService) {
        super(entityService, CustomerOrder.class);
    }
}
