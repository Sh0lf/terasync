package isep.webapp.terasync.repository.user;

import isep.webapp.terasync.model.user.DeliveryService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface DeliveryServiceRepository extends JpaRepository<DeliveryService, Integer> {
    DeliveryService findByEmail(String email);
    DeliveryService findByToken(String token);

    @Modifying
    @Query("UPDATE DeliveryService c SET c.emailVerified = true WHERE c.email = :email")
    Integer verifyEmail(@Param("email") String email);
    @Modifying
    @Query("Update DeliveryService c SET c.password = :password WHERE c.email = :email")
    Integer updatePasswordByEmail(@Param("email") String email, @Param("password") String password);

    @Modifying
    @Query("UPDATE DeliveryService c SET c.token = :token WHERE c.email = :email")
    Integer updateTokenByEmail(@Param("email") String email, @Param("token") String token);

    @Modifying
    @Query("UPDATE DeliveryService c SET c.token = :newToken WHERE c.token = :oldToken")
    Integer updateTokenByOldToken(@Param("oldToken") String oldToken, @Param("newToken") String newToken);

    @Modifying
    @Query("UPDATE DeliveryService c SET c.pfpImgPath = :pfpImgPath WHERE c.email = :email")
    Integer updatePfpImgPathByEmail(@Param("email") String email, @Param("pfpImgPath") String pfpImgPath);

    @Modifying
    @Query("DELETE FROM DeliveryService p WHERE p.deliveryServiceId = :id")
    Integer deleteEntityById(Integer id);

    @Modifying
    @Query("UPDATE DeliveryService c SET c.approved = :approved WHERE c.email = :email")
    Integer updateApprovalByEmail(@Param("email") String email, @Param("approved") boolean approved);
}
