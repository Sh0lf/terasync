package isep.webapp.terasync.service.user;

import isep.webapp.terasync.model.user.Admin;
import isep.webapp.terasync.model.user.Business;
import isep.webapp.terasync.repository.user.BusinessRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BusinessService extends UserService<Business, BusinessRepository> {

    @Autowired
    public BusinessService(BusinessRepository entityRepository) {
        super(entityRepository);
    }

    public Business findByEmail(String email) {
        return entityRepository.findByEmail(email);
    }

    @Override
    public Business findByToken(String token) {
        return entityRepository.findByToken(token);
    }

    @Override
    public Integer updatePassword(String email, String password) {
        return entityRepository.updatePassword(email, password);
    }
}
