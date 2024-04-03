package isep.webapp.terasync.repository.user;

import isep.webapp.terasync.model.user.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin, Integer> {
}
