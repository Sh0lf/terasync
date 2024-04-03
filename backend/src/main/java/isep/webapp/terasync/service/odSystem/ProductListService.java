package isep.webapp.terasync.service.odSystem;

import isep.webapp.terasync.model.odSystem.ProductList;
import isep.webapp.terasync.repository.odSystem.ProductListRepository;
import isep.webapp.terasync.service.EntityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductListService extends EntityService<ProductList, ProductListRepository> {
    @Autowired
    public ProductListService(ProductListRepository entityRepository) {
        super(entityRepository);
    }
}
