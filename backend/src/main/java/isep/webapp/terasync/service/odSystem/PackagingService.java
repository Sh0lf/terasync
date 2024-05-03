package isep.webapp.terasync.service.odSystem;

import isep.webapp.terasync.model.odSystem.Packaging;
import isep.webapp.terasync.repository.odSystem.PackagingRepository;
import isep.webapp.terasync.service.EntityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PackagingService extends EntityService<Packaging, PackagingRepository> {
    @Autowired
    public PackagingService(PackagingRepository entityRepository) {
        super(entityRepository);
    }

    @Transactional
    @Override
    public Integer deleteEntityById(Integer id) {
        return entityRepository.deleteEntityById(id);
    }
}
