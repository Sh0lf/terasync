package isep.webapp.terasync.model.users;

import lombok.Getter;
import lombok.Setter;

@Setter @Getter
public class Admin extends AbstractUser{

    public Admin(Long adminId, String adminName, String adminPwd, String adminEmail, Long adminPhone) {
        super(adminId, adminName, adminPwd, adminEmail, adminPhone);
    }
}
