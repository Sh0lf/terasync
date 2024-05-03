package isep.webapp.terasync.service.odSystem;

import isep.webapp.terasync.model.odSystem.Product;
import isep.webapp.terasync.repository.odSystem.ProductRepository;
import isep.webapp.terasync.service.EntityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProductService extends EntityService<Product, ProductRepository> {
    @Autowired
    public ProductService(ProductRepository entityRepository) {
        super(entityRepository);
    }

    @Transactional
    @Override
    public Integer deleteEntityById(Integer id) {
        return entityRepository.deleteEntityById(id);
    }
}
