package isep.webapp.terasync.service.odSystem;

import isep.webapp.terasync.model.odSystem.PaymentMethod;
import isep.webapp.terasync.repository.odSystem.PaymentMethodRepository;
import isep.webapp.terasync.service.EntityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PaymentMethodService extends EntityService<PaymentMethod, PaymentMethodRepository> {
    @Autowired
    public PaymentMethodService(PaymentMethodRepository entityRepository) {
        super(entityRepository);
    }

    @Transactional
    @Override
    public Integer deleteEntityById(Integer id) {
        return entityRepository.deleteEntityById(id);
    }
}
