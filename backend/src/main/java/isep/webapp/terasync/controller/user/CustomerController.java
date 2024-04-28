package isep.webapp.terasync.controller.user;

import isep.webapp.terasync.model.user.Customer;
import isep.webapp.terasync.service.user.CustomerService;
import jakarta.persistence.PostUpdate;
import org.hibernate.annotations.SQLUpdate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/customer")
public class CustomerController extends UserController<Customer, CustomerService> {
    public CustomerController(CustomerService entityService) {
        super(entityService, Customer.class);
    }
}
