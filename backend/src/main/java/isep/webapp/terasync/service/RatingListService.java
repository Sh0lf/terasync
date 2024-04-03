package isep.webapp.terasync.service;

import isep.webapp.terasync.model.RatingList;
import isep.webapp.terasync.repository.RatingListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RatingListService extends EntityService<RatingList, RatingListRepository> {
    @Autowired
    public RatingListService(RatingListRepository entityRepository) {
        super(entityRepository);
    }
}
