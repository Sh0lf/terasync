package isep.webapp.terasync.repository.odSystem;

import isep.webapp.terasync.model.odSystem.CustomerOrder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerOrderRepository extends JpaRepository<CustomerOrder, Integer>{
}
