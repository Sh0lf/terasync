package isep.webapp.terasync.repository.odSystem;

import isep.webapp.terasync.model.odSystem.PaymentMethod;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface PaymentMethodRepository extends JpaRepository<PaymentMethod, Integer> {

    @Modifying
    @Query("DELETE FROM PaymentMethod p WHERE p.paymentMethodId = :id")
    Integer deleteEntityById(Integer id);
}
