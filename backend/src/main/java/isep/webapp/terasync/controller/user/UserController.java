package isep.webapp.terasync.controller.user;

import isep.webapp.terasync.controller.EntityController;
import isep.webapp.terasync.model.user.Customer;
import isep.webapp.terasync.service.EntityService;
import isep.webapp.terasync.service.user.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

public abstract class UserController<T, S extends UserService<T, ?>> extends EntityController<T, S> {

    protected UserController(S entityService) {
        super(entityService);
    }

    @GetMapping("/findByEmail/{email}")
    public ResponseEntity<T> findCustomerByEmail(@PathVariable("email") String email) {
        return ResponseEntity.ok(entityService.findByEmail(email));
    }
}
