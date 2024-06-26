package isep.webapp.terasync.model.user;

import isep.webapp.terasync.model.odSystem.CustomerOrder;
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
public class DeliveryPerson extends User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "deliveryPersonId")
    private int deliveryPersonId;
    @Column(name = "firstName")
    private String firstName;
    @Column(name = "lastName")
    private String lastName;
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
    @Column(name = "deliveryServiceId")
    private int deliveryServiceId;
    @Column(name = "emailVerified")
    private boolean emailVerified;
    @Column(name = "pfpImgPath")
    private String pfpImgPath;

    @OneToMany(
            fetch = FetchType.EAGER,
            targetEntity = CustomerOrder.class,
            cascade = CascadeType.ALL
    )
    @JoinColumn(name = "deliveryPersonId", updatable = false)
    private List<CustomerOrder> customerOrders;

    @Override
    public int getUserId() {
        return deliveryPersonId;
    }

    @Override
    public String getName() {
        return firstName + " " + lastName;
    }

    @Override
    public boolean getEmailVerified() {
        return emailVerified;
    }
}
