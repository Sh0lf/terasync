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
        super(entityService);
    }

    @GetMapping("/verify-email/{email}")
    public ResponseEntity<Integer> verifyEmail(@PathVariable("email") String email) {
        return ResponseEntity.ok(entityService.verifyEmail(email));
    }

    @GetMapping("/update-password/{email}/{password}")
    public ResponseEntity<Integer> updatePassword(@PathVariable("email") String email, @PathVariable("password") String password) {
        return ResponseEntity.ok(entityService.updatePassword(email, password));
    }
}
