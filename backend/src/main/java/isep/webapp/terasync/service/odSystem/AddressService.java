package isep.webapp.terasync.service.odSystem;

import isep.webapp.terasync.model.odSystem.Address;
import isep.webapp.terasync.model.query.update.ValueByField;
import isep.webapp.terasync.repository.odSystem.AddressRepository;
import isep.webapp.terasync.service.EntityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AddressService extends EntityService<Address, AddressRepository> {
    @Autowired
    public AddressService(AddressRepository entityRepository) {
        super(entityRepository);
    }

    @Transactional
    @Override
    public Integer deleteEntityById(Integer id) {
        return entityRepository.deleteEntityById(id);
    }
}
