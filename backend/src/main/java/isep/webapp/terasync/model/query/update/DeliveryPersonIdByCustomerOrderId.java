package isep.webapp.terasync.model.query.update;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class DeliveryPersonIdByCustomerOrderId {
    private int deliveryPersonId;
    private int customerOrderId;
}
