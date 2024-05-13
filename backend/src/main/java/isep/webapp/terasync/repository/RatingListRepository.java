package isep.webapp.terasync.repository;

import isep.webapp.terasync.model.RatingList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface RatingListRepository extends JpaRepository<RatingList, Integer> {
    @Modifying
    @Query("DELETE FROM RatingList p WHERE p.ratingListId = :id")
    Integer deleteEntityById(Integer id);

    RatingList findByCustomerOrderId(Integer id);
}
