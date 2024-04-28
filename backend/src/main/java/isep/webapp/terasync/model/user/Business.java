package isep.webapp.terasync.model.user;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

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

    @Override
    public int getUserId() {
        return businessId;
    }

    @Override
    public boolean getEmailVerified() {
        return emailVerified;
    }
}
