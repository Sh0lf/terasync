package isep.webapp.terasync.service.odSystem;

import isep.webapp.terasync.model.odSystem.CustomerOrderList;
import isep.webapp.terasync.repository.odSystem.CustomerOrderListRepository;
import isep.webapp.terasync.service.EntityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerOrderListService extends EntityService<CustomerOrderList, CustomerOrderListRepository>{
    @Autowired
    public CustomerOrderListService(CustomerOrderListRepository entityRepository) {
        super(entityRepository);
    }
}
