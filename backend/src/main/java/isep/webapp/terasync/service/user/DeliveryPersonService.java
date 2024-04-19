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

    public DeliveryPerson findByEmail(String email) {
        return entityRepository.findByEmail(email);
    }
}
