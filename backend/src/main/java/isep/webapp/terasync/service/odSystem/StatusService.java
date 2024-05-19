package isep.webapp.terasync.service.odSystem;

import isep.webapp.terasync.model.odSystem.Status;
import isep.webapp.terasync.repository.odSystem.StatusRepository;
import isep.webapp.terasync.service.EntityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class StatusService extends EntityService<Status, StatusRepository> {
    @Autowired
    public StatusService(StatusRepository entityRepository) {
        super(entityRepository);
    }

    @Transactional
    @Override
    public Integer deleteEntityById(Integer id) {
        return entityRepository.deleteEntityById(id);
    }

    public Status findStatusByString(String status) {
        return entityRepository.findStatusByStatusString(status);
    }
}
