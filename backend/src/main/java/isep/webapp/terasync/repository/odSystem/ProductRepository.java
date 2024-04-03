package isep.webapp.terasync.repository.odSystem;

import isep.webapp.terasync.model.odSystem.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Integer> {
}
