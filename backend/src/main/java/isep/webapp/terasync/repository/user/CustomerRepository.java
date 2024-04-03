package isep.webapp.terasync.repository.user;

import isep.webapp.terasync.model.user.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {
}
