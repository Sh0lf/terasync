package isep.webapp.terasync.controller;

import isep.webapp.terasync.model.Faq;
import isep.webapp.terasync.service.FaqService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/faq")
public class FaqController extends EntityController<Faq, FaqService>{
    protected FaqController(FaqService entityService) {
        super(entityService);
    }
}
