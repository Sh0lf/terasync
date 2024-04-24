package isep.webapp.terasync.controller.user;

import isep.webapp.terasync.controller.EntityController;
import isep.webapp.terasync.service.user.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

public abstract class UserController<T, S extends UserService<T, ?>> extends EntityController<T, S> {

    protected UserController(S entityService) {
        super(entityService);
    }
    @GetMapping("/find-by-email/{email}")
    public ResponseEntity<T> findCustomerByEmail(@PathVariable("email") String email) {
        return ResponseEntity.ok(entityService.findByEmail(email));
    }

    @GetMapping("/find-by-token/{token}")
    public ResponseEntity<T> findCustomerByToken(@PathVariable("token") String token) {
        return ResponseEntity.ok(entityService.findByToken(token));
    }

    @GetMapping("/update-password/{email}/{password}")
    public ResponseEntity<Integer> updatePassword(@PathVariable("email") String email, @PathVariable("password") String password) {
        return ResponseEntity.ok(entityService.updatePassword(email, password));
    }

    @GetMapping("/update-token/{email}/{token}")
    public ResponseEntity<Integer> updateToken(@PathVariable("email") String email, @PathVariable("token") String token) {
        return ResponseEntity.ok(entityService.updateToken(email, token));
    }
}
