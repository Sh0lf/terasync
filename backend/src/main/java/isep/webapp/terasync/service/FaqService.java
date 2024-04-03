package isep.webapp.terasync.service;

import isep.webapp.terasync.model.Faq;
import isep.webapp.terasync.repository.FaqRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FaqService extends EntityService<Faq, FaqRepository> {
    @Autowired
    public FaqService(FaqRepository entityRepository) {
        super(entityRepository);
    }
}
