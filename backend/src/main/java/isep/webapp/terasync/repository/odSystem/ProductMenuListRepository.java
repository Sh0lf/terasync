package isep.webapp.terasync.repository.odSystem;

import isep.webapp.terasync.model.odSystem.ProductMenuList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface ProductMenuListRepository extends JpaRepository<ProductMenuList, Integer> {
    @Modifying
    @Query("DELETE FROM ProductMenuList p WHERE p.productMenuListId = :id")
    Integer deleteEntityById(Integer id);
}
