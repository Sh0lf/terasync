package isep.webapp.terasync.controller.odSystem;

import isep.webapp.terasync.controller.EntityController;
import isep.webapp.terasync.model.odSystem.ProductList;
import isep.webapp.terasync.service.odSystem.ProductListService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/product-list")
public class ProductListController extends EntityController<ProductList, ProductListService> {

    protected ProductListController(ProductListService entityService) {
        super(entityService);
    }
}
