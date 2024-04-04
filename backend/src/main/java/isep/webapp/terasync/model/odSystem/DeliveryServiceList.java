package isep.webapp.terasync.model.odSystem;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class DeliveryServiceList {
    @Id
    @GeneratedValue
    @Column(name = "deliveryServiceListId")
    private int deliveryServiceListId;
    @Column(name = "deliveryServiceId")
    private int deliveryServiceId;
    @Column(name = "businessId")
    private int businessId;
}
