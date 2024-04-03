package isep.webapp.terasync.repository.odSystem;

import isep.webapp.terasync.model.odSystem.Status;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StatusRepository extends JpaRepository<Status, Integer> {
}
