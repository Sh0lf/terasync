package isep.webapp.terasync.service.odSystem;

import isep.webapp.terasync.model.odSystem.ProductMenuList;
import isep.webapp.terasync.repository.odSystem.ProductMenuListRepository;
import isep.webapp.terasync.service.EntityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductMenuListService extends EntityService<ProductMenuList, ProductMenuListRepository> {
    @Autowired
    public ProductMenuListService(ProductMenuListRepository entityRepository) {
        super(entityRepository);
    }
}
