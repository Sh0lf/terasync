package isep.webapp.terasync.repository.odSystem;

import isep.webapp.terasync.model.odSystem.CustomerOrderList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface CustomerOrderListRepository extends JpaRepository<CustomerOrderList, Integer> {

    @Modifying
    @Query("DELETE FROM CustomerOrderList p WHERE p.customerOrderListId = :id")
    Integer deleteEntityById(Integer id);
}
