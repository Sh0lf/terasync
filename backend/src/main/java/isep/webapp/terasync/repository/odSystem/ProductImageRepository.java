package isep.webapp.terasync.repository.odSystem;

import isep.webapp.terasync.model.odSystem.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface ProductImageRepository extends JpaRepository<ProductImage, Integer> {

    @Modifying
    @Query("DELETE FROM ProductImage p WHERE p.productImageId = :id")
    Integer deleteEntityById(Integer id);
}
