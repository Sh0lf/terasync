package isep.webapp.terasync.repository.user;

import isep.webapp.terasync.model.user.Admin;
import isep.webapp.terasync.model.user.Business;
import isep.webapp.terasync.model.user.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BusinessRepository extends JpaRepository<Business, Integer> {
    Business findByEmail(String email);
}
