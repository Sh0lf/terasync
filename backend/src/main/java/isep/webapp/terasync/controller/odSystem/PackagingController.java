package isep.webapp.terasync.controller.odSystem;

import isep.webapp.terasync.controller.EntityController;
import isep.webapp.terasync.model.odSystem.Packaging;
import isep.webapp.terasync.service.odSystem.PackagingService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/packaging")
public class PackagingController extends EntityController<Packaging, PackagingService> {
    protected PackagingController(PackagingService entityService) {
        super(entityService, Packaging.class);
    }
}
