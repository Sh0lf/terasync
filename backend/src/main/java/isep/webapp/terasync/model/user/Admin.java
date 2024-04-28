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
public class Admin extends User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "adminId")
    private int adminId;
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
    @Column(name = "registrationDate")
    @CreationTimestamp
    private String registrationDate;
    @Column(name = "emailVerified")
    private boolean emailVerified;
    @Column(name = "pfpImgPath")
    private String pfpImgPath;

    @Override
    public int getUserId() {
        return adminId;
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
