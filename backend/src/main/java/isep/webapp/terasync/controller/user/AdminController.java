package isep.webapp.terasync.controller.user;

import isep.webapp.terasync.model.user.Admin;
import isep.webapp.terasync.service.user.AdminService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
public class AdminController extends UserController<Admin, AdminService> {

    protected AdminController(AdminService entityService) {
        super(entityService);
    }
}
