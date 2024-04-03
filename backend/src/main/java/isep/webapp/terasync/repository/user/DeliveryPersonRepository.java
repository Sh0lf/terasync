package isep.webapp.terasync.repository.user;

import isep.webapp.terasync.model.user.DeliveryPerson;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeliveryPersonRepository extends JpaRepository<DeliveryPerson, Integer> {
}
