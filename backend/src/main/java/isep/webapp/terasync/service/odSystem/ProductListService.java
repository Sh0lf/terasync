package isep.webapp.terasync.service.odSystem;

import isep.webapp.terasync.model.odSystem.ProductList;
import isep.webapp.terasync.model.query.update.ValueByField;
import isep.webapp.terasync.repository.odSystem.ProductListRepository;
import isep.webapp.terasync.service.EntityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProductListService extends EntityService<ProductList, ProductListRepository> {
    @Autowired
    public ProductListService(ProductListRepository entityRepository) {
        super(entityRepository);
    }

    @Transactional
    @Override
    public Integer deleteEntityById(Integer id) {
        return entityRepository.deleteEntityById(id);
    }

    @Transactional
    public Integer deleteByProductId(Integer id) {
        return entityRepository.deleteByProductId(id);
    }
}
