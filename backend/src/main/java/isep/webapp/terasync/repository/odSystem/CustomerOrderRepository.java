package isep.webapp.terasync.repository.odSystem;

import isep.webapp.terasync.model.odSystem.CustomerOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface CustomerOrderRepository extends JpaRepository<CustomerOrder, Integer>{

    @Modifying
    @Query("DELETE FROM CustomerOrder p WHERE p.customerId = :id")
    Integer deleteEntityById(Integer id);

    @Modifying
    @Query("UPDATE CustomerOrder p SET p.statusId = :statusId WHERE p.customerOrderId = :customerOrderId")
    Integer updateStatusIdByCustomerOrderId(Integer statusId, Integer customerOrderId);

    @Modifying
    @Query("UPDATE CustomerOrder p SET p.deliveryPersonId = :deliveryPersonId WHERE p.customerOrderId = :customerOrderId")
    Integer updateDeliveryPersonIdByCustomerOrderId(Integer deliveryPersonId, Integer customerOrderId);

    @Modifying
    @Query("UPDATE CustomerOrder p SET p.deliveryTime = :currentDateTime WHERE p.customerOrderId = :customerOrderId")
    Integer updateDeliveryTimeByCustomerOrderId(Integer customerOrderId, String currentDateTime);

    @Modifying
    @Query("UPDATE CustomerOrder p SET p.minTemp = :minTemp WHERE p.customerOrderId = :customerOrderId")
    Integer updateMinTempByCustomerOrderId(Integer customerOrderId, Integer minTemp);

    @Modifying
    @Query("UPDATE CustomerOrder p SET p.maxTemp = :maxTemp WHERE p.customerOrderId = :customerOrderId")
    Integer updateMaxTempByCustomerOrderId(Integer customerOrderId, Integer maxTemp);
}
