package isep.webapp.terasync.repository.odSystem;

import isep.webapp.terasync.model.odSystem.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface ProductRepository extends JpaRepository<Product, Integer> {
    @Modifying
    @Query("DELETE FROM Product p WHERE p.productId = :productId")
    Integer deleteEntityById(Integer productId);
}
