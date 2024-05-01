package isep.webapp.terasync.model.user;

import isep.webapp.terasync.model.RatingList;
import isep.webapp.terasync.model.odSystem.CustomerOrder;
import isep.webapp.terasync.model.odSystem.DeliveryServiceList;
import isep.webapp.terasync.model.odSystem.Product;
import isep.webapp.terasync.model.odSystem.ProductMenu;
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
public class Business extends User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "businessId")
    private int businessId;
    @Column(name = "name")
    private String name;
    @Column(name = "address")
    private String address;
    @Column(name = "phone")
    private String phone;
    @Column(name = "email")
    private String email;
    @Column(name = "username")
    private String username;
    @Column(name = "password")
    private String password;
    @Column(name = "token")
    private String token;
    @Column(name = "registrationDate")
    @CreationTimestamp
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
    @JoinColumn(name = "businessId")
    private List<CustomerOrder> customerOrders;

    @OneToMany(
            fetch = FetchType.EAGER,
            targetEntity = DeliveryServiceList.class,
            cascade = CascadeType.ALL
    )
    @JoinColumn(name = "businessId")
    private List<DeliveryServiceList> deliveryServiceLists;

    @OneToMany(
            fetch = FetchType.EAGER,
            targetEntity = ProductMenu.class,
            cascade = CascadeType.ALL
    )
    @JoinColumn(name = "businessId")
    private List<ProductMenu> productMenus;

    @OneToMany(
            fetch = FetchType.EAGER,
            targetEntity = Product.class,
            cascade = CascadeType.ALL
    )
    @JoinColumn(name = "businessId")
    private List<Product> products;

    @OneToMany(
            fetch = FetchType.EAGER,
            targetEntity = RatingList.class,
            cascade = CascadeType.ALL
    )
    @JoinColumn(name = "businessId")
    private List<RatingList> ratingLists;

    @Override
    public int getUserId() {
        return businessId;
    }

    @Override
    public boolean getEmailVerified() {
        return emailVerified;
    }
}
