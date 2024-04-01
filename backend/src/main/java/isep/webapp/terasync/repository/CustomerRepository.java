package isep.webapp.terasync.repository;

import isep.webapp.terasync.model.user.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
}
