package isep.webapp.terasync.service.user;

import isep.webapp.terasync.model.query.select.ByToken;
import isep.webapp.terasync.model.query.update.PasswordByEmail;
import isep.webapp.terasync.model.query.update.TokenByEmail;
import isep.webapp.terasync.model.query.update.TokenByOldToken;
import isep.webapp.terasync.model.user.Business;
import isep.webapp.terasync.repository.user.BusinessRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class BusinessService extends UserService<Business, BusinessRepository> {

    @Autowired
    public BusinessService(BusinessRepository entityRepository) {
        super(entityRepository);
    }

    @Override
    public Business selectByEmail(String email) {
        return entityRepository.findByEmail(email);
    }

    @Override
    public Business selectByToken(ByToken byToken) {
        return entityRepository.findByToken(byToken.getToken());
    }

    @Transactional
    @Override
    public Integer updatePasswordByEmail(PasswordByEmail passwordByEmail) {
        return entityRepository.updatePasswordByEmail(passwordByEmail.getEmail(), passwordByEmail.getNewPassword());
    }

    @Transactional
    @Override
    public Integer updateTokenByEmail(TokenByEmail tokenByEmail) {
        return entityRepository.updateTokenByEmail(tokenByEmail.getEmail(), tokenByEmail.getNewToken());
    }

    @Transactional
    @Override
    public Integer updateTokenByOldToken(TokenByOldToken tokenByOldToken) {
        return entityRepository.updateTokenByOldToken(tokenByOldToken.getOldToken(), tokenByOldToken.getNewToken());
    }
}
