package isep.webapp.terasync.controller.user;

import isep.webapp.terasync.model.user.Customer;
import isep.webapp.terasync.service.user.CustomerService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/customer")
public class CustomerController extends UserController<Customer, CustomerService> {
    public CustomerController(CustomerService entityService) {
        super(entityService);
    }
}
