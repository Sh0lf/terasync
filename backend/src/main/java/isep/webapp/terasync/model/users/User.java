package isep.webapp.terasync.model.users;

import lombok.Getter;
import lombok.Setter;

@Setter @Getter
public class User extends AbstractUser{
    public User(Long id, String name, String pwd, String email,Long phone) {
        super(id, name, pwd, email, phone);
    }
}
