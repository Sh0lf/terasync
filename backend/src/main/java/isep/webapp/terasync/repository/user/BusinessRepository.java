package isep.webapp.terasync.repository.user;

import isep.webapp.terasync.model.user.Admin;
import isep.webapp.terasync.model.user.Business;
import isep.webapp.terasync.model.user.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BusinessRepository extends JpaRepository<Business, Integer> {
    Business findByEmail(String email);
    Business findByToken(String token);

    @Modifying
    @Query("Update Business c SET c.password = :password WHERE c.email = :email")
    Integer updatePassword(@Param("email") String email, @Param("password") String password);
}
