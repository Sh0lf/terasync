package isep.webapp.terasync.service.user;

import isep.webapp.terasync.model.user.Admin;
import isep.webapp.terasync.model.user.DeliveryService;
import isep.webapp.terasync.repository.user.DeliveryServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DeliveryServiceService extends UserService<DeliveryService, DeliveryServiceRepository> {
    @Autowired
    public DeliveryServiceService(DeliveryServiceRepository entityRepository) {
        super(entityRepository);
    }

    public DeliveryService findByEmail(String email) {
        return entityRepository.findByEmail(email);
    }

    @Override
    public DeliveryService findByToken(String token) {
        return entityRepository.findByToken(token);
    }

    @Override
    public Integer updatePassword(String email, String password) {
        return entityRepository.updatePassword(email, password);
    }
}
