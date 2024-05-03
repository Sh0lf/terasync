package isep.webapp.terasync.repository.odSystem;

import isep.webapp.terasync.model.odSystem.ProductMenu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface ProductMenuRepository extends JpaRepository<ProductMenu, Integer> {
    @Modifying
    @Query("DELETE FROM ProductMenu p WHERE p.productMenuId = :id")
    Integer deleteEntityById(Integer id);
}
