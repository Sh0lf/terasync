package isep.webapp.terasync.model.odSystem;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class PaymentMethod extends isep.webapp.terasync.model.Entity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "paymentMethodId")
    private int paymentMethodId;
    @Column(name = "name")
    private String name;
    @Column(name = "cardNumber")
    private String cardNumber;
    @Column(name ="defaultPaymentMethod")
    private boolean defaultPaymentMethod;
    @Column(name = "customerId")
    private int customerId;
    @Column(name = "addressId")
    private int addressId;
}
