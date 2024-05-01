package isep.webapp.terasync.model.user;

import isep.webapp.terasync.model.odSystem.CustomerOrder;
import isep.webapp.terasync.model.odSystem.DeliveryServiceList;
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
public class DeliveryService extends User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "deliveryServiceId")
    private int deliveryServiceId;
    @Column(name = "name")
    private String name;
    @Column(name = "email")
    private String email;
    @Column(name = "username")
    private String username;
    @Column(name = "password")
    private String password;
    @Column(name = "token")
    private String token;
    @CreationTimestamp
    @Column(name = "registrationDate")
    private String registrationDate;
    @Column(name = "emailVerified")
    private boolean emailVerified;
    @Column(name= "approved")
    private boolean approved;
    @Column(name = "pfpImgPath")
    private String pfpImgPath;

    @OneToMany(
            fetch = FetchType.EAGER,
            targetEntity = CustomerOrder.class,
            cascade = CascadeType.ALL
    )
    @JoinColumn(name = "deliveryServiceId")
    private List<CustomerOrder> customerOrders;

    @OneToMany(
            fetch = FetchType.EAGER,
            targetEntity = DeliveryServiceList.class,
            cascade = CascadeType.ALL
    )
    @JoinColumn(name = "deliveryServiceId")
    private List<DeliveryServiceList> deliveryServiceLists;

    @OneToMany(
            fetch = FetchType.EAGER,
            targetEntity = DeliveryPerson.class,
            cascade = CascadeType.ALL
    )
    @JoinColumn(name = "deliveryServiceId")
    private List<DeliveryPerson> deliveryPeople;

    @Override
    public int getUserId() {
        return deliveryServiceId;
    }

    @Override
    public boolean getEmailVerified() {
        return emailVerified;
    }
}
