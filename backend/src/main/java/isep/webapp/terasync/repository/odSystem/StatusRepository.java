package isep.webapp.terasync.repository.odSystem;

import isep.webapp.terasync.model.odSystem.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface StatusRepository extends JpaRepository<Status, Integer> {
    @Modifying
    @Query("DELETE FROM Status p WHERE p.statusId = :id")
    Integer deleteEntityById(Integer id);

    @Query("SELECT new Status(p.statusId, p.status) FROM Status p WHERE p.status = :status")
    Status findStatusByStatusString(String status);
}
