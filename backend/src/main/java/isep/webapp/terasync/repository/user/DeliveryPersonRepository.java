package isep.webapp.terasync.repository.user;

import isep.webapp.terasync.model.user.Customer;
import isep.webapp.terasync.model.user.DeliveryPerson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface DeliveryPersonRepository extends JpaRepository<DeliveryPerson, Integer> {
    DeliveryPerson findByEmail(String email);
    DeliveryPerson findByToken(String token);

    @Modifying
    @Query("Update DeliveryPerson c SET c.password = :password WHERE c.email = :email")
    Integer updatePassword(@Param("email") String email, @Param("password") String password);
}
