package isep.webapp.terasync.controller.odSystem;

import isep.webapp.terasync.controller.EntityController;
import isep.webapp.terasync.model.odSystem.ProductMenuList;
import isep.webapp.terasync.service.odSystem.ProductMenuListService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/product-menu-list")
public class ProductMenuListController extends EntityController<ProductMenuList, ProductMenuListService> {

    protected ProductMenuListController(ProductMenuListService entityService) {
        super(entityService, ProductMenuList.class);
    }
}
