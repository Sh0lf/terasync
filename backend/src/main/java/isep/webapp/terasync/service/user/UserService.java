package isep.webapp.terasync.service.user;

import isep.webapp.terasync.model.user.Admin;
import isep.webapp.terasync.service.EntityService;
import org.springframework.data.jpa.repository.JpaRepository;

public abstract class UserService<T, R extends JpaRepository<T, Integer>> extends EntityService<T, R> {
    public UserService(R entityRepository) {
        super(entityRepository);
    }
    public abstract T findByEmail(String email);
}
