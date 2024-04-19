package isep.webapp.terasync.repository.user;

import isep.webapp.terasync.model.user.Admin;
import isep.webapp.terasync.model.user.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin, Integer> {
    Admin findByEmail(String email);
}
