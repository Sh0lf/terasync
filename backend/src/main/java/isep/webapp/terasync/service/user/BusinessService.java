package isep.webapp.terasync.service.user;

import isep.webapp.terasync.model.user.Business;
import isep.webapp.terasync.repository.user.BusinessRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BusinessService extends UserService<Business, BusinessRepository> {

    @Autowired
    public BusinessService(BusinessRepository entityRepository) {
        super(entityRepository);
    }
}
