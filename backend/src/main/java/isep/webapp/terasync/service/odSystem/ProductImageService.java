package isep.webapp.terasync.service.odSystem;

import isep.webapp.terasync.model.odSystem.ProductImage;
import isep.webapp.terasync.repository.odSystem.ProductImageRepository;
import isep.webapp.terasync.service.EntityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductImageService extends EntityService<ProductImage, ProductImageRepository> {
    @Autowired
    public ProductImageService(ProductImageRepository entityRepository) {
        super(entityRepository);
    }
}
