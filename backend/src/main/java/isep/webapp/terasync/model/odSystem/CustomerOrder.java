package isep.webapp.terasync.model.odSystem;

import isep.webapp.terasync.model.MessageList;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.util.List;

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
    @Column(name = "addressId")
    private int addressId;
    @Column(name = "paymentMethodId")
    private int paymentMethodId;


    @ManyToOne(
            fetch = FetchType.EAGER,
            targetEntity = Status.class
    )
    @JoinColumn(
            name = "statusId",
            insertable = false,
            updatable = false
    )
    private Status status;

    @ManyToOne(
            fetch = FetchType.EAGER,
            targetEntity = Packaging.class
    )
    @JoinColumn(
            name = "packagingId",
            insertable = false,
            updatable = false
    )
    private Packaging packaging;

    @ManyToOne(
            fetch = FetchType.EAGER,
            targetEntity = Address.class
    )
    @JoinColumn(
            name = "addressId",
            insertable = false,
            updatable = false
    )
    private Address address;

    @OneToMany(
            fetch = FetchType.EAGER,
            targetEntity = CustomerOrderList.class,
            cascade = CascadeType.ALL
    )
    @JoinColumn(name = "customerOrderId")
    private List<CustomerOrderList> customerOrderLists;

    @OneToMany(
            fetch = FetchType.EAGER,
            targetEntity = MessageList.class,
            cascade = CascadeType.ALL
    )
    @JoinColumn(name = "customerOrderId")
    private List<MessageList> messageLists;

    @ManyToOne(
            fetch = FetchType.EAGER,
            targetEntity = PaymentMethod.class
    )
    @JoinColumn(
            name = "paymentMethodId",
            insertable = false,
            updatable = false
    )
    private PaymentMethod paymentMethod;
}
