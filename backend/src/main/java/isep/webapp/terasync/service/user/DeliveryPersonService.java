package isep.webapp.terasync.service.user;

import isep.webapp.terasync.model.misc.TokenByOldToken;
import isep.webapp.terasync.model.user.DeliveryPerson;
import isep.webapp.terasync.repository.user.DeliveryPersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class DeliveryPersonService extends UserService<DeliveryPerson, DeliveryPersonRepository> {
    @Autowired
    public DeliveryPersonService(DeliveryPersonRepository entityRepository) {
        super(entityRepository);
    }

    @Override
    public DeliveryPerson findByEmail(String email) {
        return entityRepository.findByEmail(email);
    }

    @Override
    public DeliveryPerson findByToken(String token) {
        return entityRepository.findByToken(token);
    }

    @Transactional
    @Override
    public Integer updatePasswordByEmail(DeliveryPerson deliveryPerson) {
        return entityRepository.updatePasswordByEmail(deliveryPerson.getEmail(), deliveryPerson.getPassword());
    }

    @Override
    public Integer updateTokenByEmail(DeliveryPerson deliveryPerson) {
        return entityRepository.updateTokenByEmail(deliveryPerson.getEmail(), deliveryPerson.getToken());
    }

    @Override
    public Integer updateTokenByOldToken(TokenByOldToken tokenByOldToken) {
        return entityRepository.updateTokenByOldToken(tokenByOldToken.getOldToken(), tokenByOldToken.getNewToken());
    }
}
