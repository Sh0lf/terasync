package isep.webapp.terasync.service.odSystem;

import isep.webapp.terasync.model.odSystem.ProductMenu;
import isep.webapp.terasync.repository.odSystem.ProductMenuRepository;
import isep.webapp.terasync.service.EntityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductMenuService extends EntityService<ProductMenu, ProductMenuRepository> {
    @Autowired
    public ProductMenuService(ProductMenuRepository entityRepository) {
        super(entityRepository);
    }
}