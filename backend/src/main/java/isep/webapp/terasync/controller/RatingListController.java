package isep.webapp.terasync.controller;

import isep.webapp.terasync.model.RatingList;
import isep.webapp.terasync.service.RatingListService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rating-list")
public class RatingListController extends EntityController<RatingList, RatingListService>{
    protected RatingListController(RatingListService entityService) {
        super(entityService);
    }
}
