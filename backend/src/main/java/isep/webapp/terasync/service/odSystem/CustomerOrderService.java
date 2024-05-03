package isep.webapp.terasync.service.odSystem;

import isep.webapp.terasync.model.odSystem.CustomerOrder;
import isep.webapp.terasync.repository.odSystem.CustomerOrderRepository;
import isep.webapp.terasync.service.EntityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CustomerOrderService extends EntityService<CustomerOrder, CustomerOrderRepository> {
    @Autowired
    public CustomerOrderService(CustomerOrderRepository entityRepository) {
        super(entityRepository);
    }

    @Transactional
    @Override
    public Integer deleteEntityById(Integer id) {
        return entityRepository.deleteEntityById(id);
    }
}
