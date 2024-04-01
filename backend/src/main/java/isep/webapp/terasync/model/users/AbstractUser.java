package isep.webapp.terasync.model.users;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter @Getter @AllArgsConstructor
public abstract class AbstractUser {
    private Long id;
    private String name;
    private String pwd;
    private String email;
    private Long phone;
}
