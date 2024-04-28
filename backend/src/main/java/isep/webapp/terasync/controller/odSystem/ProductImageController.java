package isep.webapp.terasync.controller.odSystem;

import isep.webapp.terasync.controller.EntityController;
import isep.webapp.terasync.model.odSystem.ProductImage;
import isep.webapp.terasync.service.odSystem.ProductImageService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/product-image")
public class ProductImageController extends EntityController<ProductImage, ProductImageService> {
    protected ProductImageController(ProductImageService entityService) {
        super(entityService, ProductImage.class);
    }
}
