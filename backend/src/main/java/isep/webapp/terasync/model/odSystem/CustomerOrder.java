package isep.webapp.terasync.model.odSystem;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CustomerOrder {
    @Id
    @GeneratedValue
    @Column(name = "customerOrderId")
    private int customerOrderId;
    @Column(name = "creationTime")
    private String creationTime;
    @Column(name = "minTemp")
    private double minTemp;
    @Column(name = "maxTemp")
    private double maxTemp;
    @Column(name = "deliveryTime")
    private String deliveryTime;
    @Column(name = "statusId")
    private String statusId;
    @Column(name = "packagingId")
    private int packagingId;
    @Column(name = "customerId")
    private int customerId;
    @Column(name = "businessId")
    private int businessId;
    @Column(name = "deliveryServiceId")
    private int deliveryServiceId;
    @Column(name = "deliveryPersonId")
    private int deliveryPersonId;
}
