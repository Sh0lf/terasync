package isep.webapp.terasync.controller.odSystem;

import isep.webapp.terasync.controller.EntityController;
import isep.webapp.terasync.model.odSystem.Status;
import isep.webapp.terasync.service.odSystem.StatusService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/status")
public class StatusController extends EntityController<Status, StatusService> {

    protected StatusController(StatusService entityService) {
        super(entityService, Status.class);
    }
}
