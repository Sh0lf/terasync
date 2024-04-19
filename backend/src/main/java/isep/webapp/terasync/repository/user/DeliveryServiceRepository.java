package isep.webapp.terasync.repository.user;

import isep.webapp.terasync.model.user.Customer;
import isep.webapp.terasync.model.user.DeliveryService;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeliveryServiceRepository extends JpaRepository<DeliveryService, Integer> {
    DeliveryService findByEmail(String email);
}
