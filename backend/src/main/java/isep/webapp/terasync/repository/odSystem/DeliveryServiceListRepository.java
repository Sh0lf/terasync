package isep.webapp.terasync.repository.odSystem;

import isep.webapp.terasync.model.odSystem.DeliveryServiceList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface DeliveryServiceListRepository extends JpaRepository<DeliveryServiceList, Integer> {

    @Modifying
    @Query("DELETE FROM DeliveryServiceList p WHERE p.deliveryServiceId = :id")
    Integer deleteEntityById(Integer id);
}
