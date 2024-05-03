package isep.webapp.terasync.repository.odSystem;

import isep.webapp.terasync.model.odSystem.Packaging;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface PackagingRepository extends JpaRepository<Packaging, Integer> {
    @Modifying
    @Query("DELETE FROM Packaging p WHERE p.packaging = :id")
    Integer deleteEntityById(Integer id);
}
