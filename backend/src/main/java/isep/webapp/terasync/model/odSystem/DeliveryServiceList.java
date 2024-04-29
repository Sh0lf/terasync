package isep.webapp.terasync.model.odSystem;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class DeliveryServiceList extends isep.webapp.terasync.model.Entity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "deliveryServiceListId")
    private int deliveryServiceListId;
    @Column(name = "deliveryServiceId")
    private int deliveryServiceId;
    @Column(name = "businessId")
    private int businessId;
}
