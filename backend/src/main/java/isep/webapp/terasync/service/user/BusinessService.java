package isep.webapp.terasync.service.user;

import isep.webapp.terasync.model.misc.TokenByOldToken;
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
    public Business findByEmail(String email) {
        return entityRepository.findByEmail(email);
    }

    @Override
    public Business findByToken(String token) {
        return entityRepository.findByToken(token);
    }

    @Transactional
    @Override
    public Integer updatePasswordByEmail(Business business) {
        return entityRepository.updatePasswordByEmail(business.getEmail(), business.getPassword());
    }

    @Transactional
    @Override
    public Integer updateTokenByEmail(Business business) {
        return entityRepository.updateTokenByEmail(business.getEmail(), business.getToken());
    }

    @Override
    public Integer updateTokenByOldToken(TokenByOldToken tokenByOldToken) {
        return entityRepository.updateTokenByOldToken(tokenByOldToken.getOldToken(), tokenByOldToken.getNewToken());
    }
}
