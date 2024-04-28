package isep.webapp.terasync.service.user;

import isep.webapp.terasync.model.Entity;
import isep.webapp.terasync.model.query.select.ByToken;
import isep.webapp.terasync.model.query.update.PasswordByEmail;
import isep.webapp.terasync.model.query.update.PfpImgPathByEmail;
import isep.webapp.terasync.model.query.update.TokenByEmail;
import isep.webapp.terasync.model.query.update.TokenByOldToken;
import isep.webapp.terasync.service.EntityService;
import org.springframework.data.jpa.repository.JpaRepository;

public abstract class UserService<T extends Entity, R extends JpaRepository<T, Integer>> extends EntityService<T, R> {
    public UserService(R entityRepository) {
        super(entityRepository);
    }
    public abstract T selectByEmail(String email);
    public abstract T selectByToken(ByToken byToken);
    public abstract Integer verifyEmail(String email);
    public abstract Integer updatePasswordByEmail(PasswordByEmail passwordByEmail);
    public abstract Integer updateTokenByEmail(TokenByEmail tokenByEmail);
    public abstract Integer updateTokenByOldToken(TokenByOldToken tokenByOldToken);
    public abstract Integer updatePfpImgPathByEmail(PfpImgPathByEmail pfpImgPathByEmail);
}
