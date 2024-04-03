package isep.webapp.terasync.service.user;

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
}
