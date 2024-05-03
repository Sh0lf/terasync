package isep.webapp.terasync.repository;

import isep.webapp.terasync.model.Faq;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface FaqRepository extends JpaRepository<Faq, Integer> {
    @Modifying
    @Query("DELETE FROM Faq p WHERE p.faqId = :id")
    Integer deleteEntityById(Integer id);
}
