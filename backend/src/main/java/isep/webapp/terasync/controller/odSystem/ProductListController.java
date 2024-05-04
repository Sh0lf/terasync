package isep.webapp.terasync.controller.odSystem;

import isep.webapp.terasync.controller.EntityController;
import isep.webapp.terasync.model.odSystem.ProductList;
import isep.webapp.terasync.service.odSystem.ProductListService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/product-list")
public class ProductListController extends EntityController<ProductList, ProductListService> {

    protected ProductListController(ProductListService entityService) {
        super(entityService, ProductList.class);
    }

    @GetMapping("/delete-by-product-id/{productId}")
    public ResponseEntity<Integer> deleteEntity(@PathVariable("productId") Integer productId) {
        return ResponseEntity.ok(entityService.deleteByProductId(productId));
    }
}
