package isep.webapp.terasync.model.user;

import isep.webapp.terasync.model.RatingList;
import isep.webapp.terasync.model.odSystem.Address;
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
public class Customer extends User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "customerId")
    private int customerId;
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
    @Column(name = "emailVerified")
    private boolean emailVerified;
    @Column(name = "pfpImgPath")
    private String pfpImgPath;

    @OneToMany(
            fetch = FetchType.EAGER,
            targetEntity = Address.class,
            cascade = CascadeType.ALL
    )
    @JoinColumn(name = "customerId")
    private List<Address> addresses;

    @OneToMany(
            fetch = FetchType.EAGER,
            targetEntity = CustomerOrder.class,
            cascade = CascadeType.ALL
    )
    @JoinColumn(name = "customerId")
    private List<CustomerOrder> customerOrders;

    @OneToMany(
            fetch = FetchType.EAGER,
            targetEntity = RatingList.class,
            cascade = CascadeType.ALL
    )
    @JoinColumn(name = "customerId")
    private List<RatingList> ratingLists;

    @Override
    public int getUserId() {
        return customerId;
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
