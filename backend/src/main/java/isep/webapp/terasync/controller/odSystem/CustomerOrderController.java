package isep.webapp.terasync.controller.odSystem;

import isep.webapp.terasync.controller.EntityController;
import isep.webapp.terasync.model.odSystem.CustomerOrder;
import isep.webapp.terasync.model.query.update.DeliveryPersonIdByCustomerOrderId;
import isep.webapp.terasync.model.query.update.StatusIdByCustomerOrderId;
import isep.webapp.terasync.model.query.update.TempByCustomerOrderId;
import isep.webapp.terasync.service.odSystem.CustomerOrderService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/customer-order")
public class CustomerOrderController extends EntityController<CustomerOrder, CustomerOrderService> {

    protected CustomerOrderController(CustomerOrderService entityService) {
        super(entityService, CustomerOrder.class);
    }

    @PostMapping("/update-status-id-by-customer-order-id")
    public Integer updateStatusIdByCustomerOrderId(@RequestBody StatusIdByCustomerOrderId statusIdByCustomerOrderId) {
        return entityService.updateStatusIdByCustomerOrderId(statusIdByCustomerOrderId);
    }

    @PostMapping("/update-delivery-person-id-by-customer-order-id")
    public Integer updateDeliveryPersonIdByCustomerOrderId(@RequestBody DeliveryPersonIdByCustomerOrderId deliveryPersonIdByCustomerOrderId) {
        return entityService.updateDeliveryPersonIdByCustomerOrderId(deliveryPersonIdByCustomerOrderId);
    }

    @GetMapping("/update-delivery-time/{customerOrderId}")
    public String updateDeliveryTimeByCustomerOrderId(@PathVariable Integer customerOrderId) {
        return entityService.updateDeliveryTimeByCustomerOrderId(customerOrderId);
    }

    @PostMapping("/update-min-temp-by-customer-order-id")
    public Integer updateTempByCustomerOrderId(@RequestBody TempByCustomerOrderId tempByCustomerOrderId) {
        return entityService.updateMinTempByCustomerOrderId(tempByCustomerOrderId);
    }

    @PostMapping("/update-max-temp-by-customer-order-id")
    public Integer updateMaxTempByCustomerOrderId(@RequestBody TempByCustomerOrderId tempByCustomerOrderId) {
        return entityService.updateMaxTempByCustomerOrderId(tempByCustomerOrderId);
    }
}
