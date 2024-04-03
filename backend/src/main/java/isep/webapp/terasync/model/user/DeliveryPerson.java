package isep.webapp.terasync.model.user;

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
public class DeliveryPerson extends User {
    @Id
    @GeneratedValue
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
    @Column(name = "registrationDate")
    private String registrationDate;
    @Column(name = "deliveryServiceId")
    private int deliveryServiceId;

    @Override
    public int getUserId() {
        return deliveryPersonId;
    }

    @Override
    public String getName() {
        return firstName + " " + lastName;
    }
}
