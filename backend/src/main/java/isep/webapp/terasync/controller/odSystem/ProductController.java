package isep.webapp.terasync.controller.odSystem;

import isep.webapp.terasync.controller.EntityController;
import isep.webapp.terasync.model.odSystem.Product;
import isep.webapp.terasync.service.odSystem.ProductService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/product")
public class ProductController extends EntityController<Product, ProductService> {
    protected ProductController(ProductService entityService) {
        super(entityService);
    }
}
