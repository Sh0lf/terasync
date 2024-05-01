package isep.webapp.terasync.model.odSystem;

import isep.webapp.terasync.model.user.Customer;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Address extends isep.webapp.terasync.model.Entity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "addressId")
    private int addressId;
    @Column(name = "country")
    private String country;
    @Column(name = "street")
    private String street;
    @Column(name = "postalCode")
    private String postalCode;
    @Column(name = "city")
    private String city;
    @Column(name = "info")
    private String info;
    @Column(name ="defaultAddress")
    private boolean defaultAddress;
    @Column(name = "customerId")
    private int customerId;
}
