package isep.webapp.terasync.repository.odSystem;

import isep.webapp.terasync.model.odSystem.ProductList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface ProductListRepository extends JpaRepository<ProductList, Integer> {
    @Modifying
    @Query("DELETE FROM ProductList p WHERE p.productListId = :id")
    Integer deleteEntityById(Integer id);

    Integer deleteByProductId(Integer id);
}
