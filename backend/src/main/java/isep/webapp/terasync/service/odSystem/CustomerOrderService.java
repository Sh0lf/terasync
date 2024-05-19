package isep.webapp.terasync.service.odSystem;

import isep.webapp.terasync.model.odSystem.CustomerOrder;
import isep.webapp.terasync.model.query.update.DeliveryPersonIdByCustomerOrderId;
import isep.webapp.terasync.model.query.update.StatusIdByCustomerOrderId;
import isep.webapp.terasync.model.query.update.TempByCustomerOrderId;
import isep.webapp.terasync.repository.odSystem.CustomerOrderRepository;
import isep.webapp.terasync.service.EntityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;


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

    @Transactional
    public Integer updateStatusIdByCustomerOrderId(StatusIdByCustomerOrderId statusIdByCustomerOrderId) {
        return entityRepository.updateStatusIdByCustomerOrderId(statusIdByCustomerOrderId.getStatusId(),
                statusIdByCustomerOrderId.getCustomerOrderId());
    }

    @Transactional
    public Integer updateDeliveryPersonIdByCustomerOrderId(DeliveryPersonIdByCustomerOrderId deliveryPersonIdByCustomerOrderId) {
        return entityRepository.updateDeliveryPersonIdByCustomerOrderId(deliveryPersonIdByCustomerOrderId.getDeliveryPersonId(),
                deliveryPersonIdByCustomerOrderId.getCustomerOrderId());
    }

    @Transactional
    public String updateDeliveryTimeByCustomerOrderId(Integer customerOrderId) {
        String param = new java.sql.Timestamp(new Date().getTime()).toString();
        if(entityRepository.updateDeliveryTimeByCustomerOrderId(customerOrderId, param) == 1) {
            return param;
        } else {
            return "0";
        }
    }

    @Transactional
    public Integer updateMinTempByCustomerOrderId(TempByCustomerOrderId tempByCustomerOrderId) {
        return entityRepository.updateMinTempByCustomerOrderId(tempByCustomerOrderId.getCustomerOrderId(), tempByCustomerOrderId.getTemp());
    }

    @Transactional
    public Integer updateMaxTempByCustomerOrderId(TempByCustomerOrderId tempByCustomerOrderId) {
        return entityRepository.updateMaxTempByCustomerOrderId(tempByCustomerOrderId.getCustomerOrderId(), tempByCustomerOrderId.getTemp());
    }
}
