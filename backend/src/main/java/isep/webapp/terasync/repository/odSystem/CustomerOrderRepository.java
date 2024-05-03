package isep.webapp.terasync.repository.odSystem;

import isep.webapp.terasync.model.odSystem.CustomerOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface CustomerOrderRepository extends JpaRepository<CustomerOrder, Integer>{

    @Modifying
    @Query("DELETE FROM CustomerOrder p WHERE p.customerId = :id")
    Integer deleteEntityById(Integer id);
}
