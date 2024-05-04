package isep.webapp.terasync.controller.odSystem;

import isep.webapp.terasync.controller.EntityController;
import isep.webapp.terasync.model.odSystem.CustomerOrderList;
import isep.webapp.terasync.service.odSystem.CustomerOrderListService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/customer-order-list")
public class CustomerOrderListController extends EntityController<CustomerOrderList, CustomerOrderListService> {
    protected CustomerOrderListController(CustomerOrderListService entityService) {
        super(entityService, CustomerOrderList.class);
    }

    @GetMapping("/delete-by-product-id/{productId}")
    public ResponseEntity<Integer> deleteEntity(@PathVariable("productId") Integer productId) {
        return ResponseEntity.ok(entityService.deleteByProductId(productId));
    }
}
