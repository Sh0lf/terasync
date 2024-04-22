package isep.webapp.terasync.repository.user;

import isep.webapp.terasync.model.user.Admin;
import isep.webapp.terasync.model.user.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AdminRepository extends JpaRepository<Admin, Integer> {
    Admin findByEmail(String email);
    Admin findByToken(String token);

    @Modifying
    @Query("Update Admin c SET c.password = :password WHERE c.email = :email")
    Integer updatePassword(@Param("email") String email, @Param("password") String password);

    @Modifying
    @Query("UPDATE Admin c SET c.token = :token WHERE c.email = :email")
    Integer updateToken(@Param("email") String email, @Param("token") String token);
}
