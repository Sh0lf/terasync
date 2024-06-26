package isep.webapp.terasync.controller.user;

import isep.webapp.terasync.model.query.update.ApprovementByEmail;
import isep.webapp.terasync.model.user.Business;
import isep.webapp.terasync.service.user.BusinessService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/business")
public class BusinessController extends UserController<Business, BusinessService>{
    protected BusinessController(BusinessService entityService) {
        super(entityService, Business.class);
    }

    @PostMapping("/approve-by-email")
    public Integer updateApprovalByEmail(@RequestBody ApprovementByEmail approvementByEmail) {
        return entityService.updateApprovalByEmail(approvementByEmail);
    }
}
