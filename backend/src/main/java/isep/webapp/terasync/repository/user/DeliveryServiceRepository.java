package isep.webapp.terasync.repository.user;

import isep.webapp.terasync.model.user.Customer;
import isep.webapp.terasync.model.user.DeliveryService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface DeliveryServiceRepository extends JpaRepository<DeliveryService, Integer> {
    DeliveryService findByEmail(String email);
    DeliveryService findByToken(String token);

    @Modifying
    @Query("Update DeliveryService c SET c.password = :password WHERE c.email = :email")
    Integer updatePassword(@Param("email") String email, @Param("password") String password);

    @Modifying
    @Query("UPDATE DeliveryService c SET c.token = :token WHERE c.email = :email")
    Integer updateToken(@Param("email") String email, @Param("token") String token);
}
