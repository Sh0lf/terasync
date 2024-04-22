package isep.webapp.terasync.service.user;

import isep.webapp.terasync.model.user.Admin;
import isep.webapp.terasync.model.user.DeliveryPerson;
import isep.webapp.terasync.repository.user.DeliveryPersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    @Override
    public Integer updatePassword(String email, String password) {
        return entityRepository.updatePassword(email, password);
    }

    @Override
    public Integer updateToken(String email, String token) {
        return null;
    }
}
