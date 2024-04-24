package isep.webapp.terasync.service.user;

import isep.webapp.terasync.model.query.TokenByEmail;
import isep.webapp.terasync.model.query.TokenByOldToken;
import isep.webapp.terasync.model.user.DeliveryService;
import isep.webapp.terasync.repository.user.DeliveryServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class DeliveryServiceService extends UserService<DeliveryService, DeliveryServiceRepository> {
    @Autowired
    public DeliveryServiceService(DeliveryServiceRepository entityRepository) {
        super(entityRepository);
    }

    @Override
    public DeliveryService findByEmail(String email) {
        return entityRepository.findByEmail(email);
    }

    @Override
    public DeliveryService findByToken(String token) {
        return entityRepository.findByToken(token);
    }

    @Transactional
    @Override
    public Integer updatePasswordByEmail(DeliveryService deliveryService) {
        return entityRepository.updatePasswordByEmail(deliveryService.getEmail(), deliveryService.getPassword());
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
