package isep.webapp.terasync.service.odSystem;

import isep.webapp.terasync.model.odSystem.DeliveryServiceList;
import isep.webapp.terasync.repository.odSystem.DeliveryServiceListRepository;
import isep.webapp.terasync.service.EntityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class DeliveryServiceListService extends EntityService<DeliveryServiceList, DeliveryServiceListRepository> {
    @Autowired
    public DeliveryServiceListService(DeliveryServiceListRepository entityRepository) {
        super(entityRepository);
    }

    @Transactional
    @Override
    public Integer deleteEntityById(Integer id) {
        return entityRepository.deleteEntityById(id);
    }
}
