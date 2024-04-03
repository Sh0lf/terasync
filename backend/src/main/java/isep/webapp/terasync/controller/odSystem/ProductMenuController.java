package isep.webapp.terasync.controller.odSystem;

import isep.webapp.terasync.controller.EntityController;
import isep.webapp.terasync.model.odSystem.ProductMenu;
import isep.webapp.terasync.service.odSystem.ProductMenuService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/product-menu")
public class ProductMenuController extends EntityController<ProductMenu, ProductMenuService> {
    protected ProductMenuController(ProductMenuService entityService) {
        super(entityService);
    }
}
