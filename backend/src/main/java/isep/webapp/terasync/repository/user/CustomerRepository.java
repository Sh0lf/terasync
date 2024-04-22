package isep.webapp.terasync.repository.user;

import isep.webapp.terasync.model.user.Customer;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {
    Customer findByEmail(String email);
    Customer findByToken(String token);

    @Modifying
    @Query("UPDATE Customer c SET c.isEmailVerified = true WHERE c.email = :email")
    Integer verifyEmail(@Param("email") String email);

    @Modifying
    @Query("Update Customer c SET c.password = :password WHERE c.email = :email")
    Integer updatePassword(@Param("email") String email, @Param("password") String password);

    @Modifying
    @Query("UPDATE Customer c SET c.token = :token WHERE c.email = :email")
    Integer updateToken(@Param("email") String email, @Param("token") String token);
}
