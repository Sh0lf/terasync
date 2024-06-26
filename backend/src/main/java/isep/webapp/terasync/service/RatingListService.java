package isep.webapp.terasync.service;

import isep.webapp.terasync.model.RatingList;
import isep.webapp.terasync.model.query.update.ValueByField;
import isep.webapp.terasync.repository.RatingListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class RatingListService extends EntityService<RatingList, RatingListRepository> {
    @Autowired
    public RatingListService(RatingListRepository entityRepository) {
        super(entityRepository);
    }

    @Transactional
    @Override
    public Integer deleteEntityById(Integer id) {
        return entityRepository.deleteEntityById(id);
    }

    public RatingList findByCustomerOrderId(Integer id) {
        return entityRepository.findByCustomerOrderId(id);
    }
}
