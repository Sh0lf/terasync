package isep.webapp.terasync.model.odSystem;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

@Entity
@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class CustomerOrder extends isep.webapp.terasync.model.Entity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "customerOrderId")
    private int customerOrderId;
    @CreationTimestamp
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


    @ManyToOne(
            fetch = FetchType.EAGER,
            targetEntity = Status.class,
            cascade = CascadeType.ALL
    )
    @JoinColumn(
            name = "statusId",
            insertable = false,
            updatable = false
    )
    private Status status;

    @ManyToOne(
            fetch = FetchType.EAGER,
            targetEntity = Packaging.class,
            cascade = CascadeType.ALL
    )
    @JoinColumn(
            name = "packagingId",
            insertable = false,
            updatable = false
    )
    private Packaging packaging;
}
