package isep.webapp.terasync.controller.user;

import isep.webapp.terasync.controller.EntityController;
import isep.webapp.terasync.model.query.TokenByEmail;
import isep.webapp.terasync.model.query.TokenByOldToken;
import isep.webapp.terasync.service.user.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

public abstract class UserController<T, S extends UserService<T, ?>> extends EntityController<T, S> {

    protected UserController(S entityService) {
        super(entityService);
    }
    @GetMapping("/find-by-email/{email}")
    public ResponseEntity<T> findCustomerByEmail(@PathVariable("email") String email) {
        return ResponseEntity.ok(entityService.findByEmail(email));
    }

    @GetMapping("/find-user-by-token/{token}")
    public ResponseEntity<T> findCustomerByToken(@PathVariable("token") String token) {
        return ResponseEntity.ok(entityService.findByToken(token));
    }

    @PostMapping("/update-password-by-email")
    public ResponseEntity<Integer> updatePasswordByEmail(@RequestBody T user) {
        return ResponseEntity.ok(entityService.updatePasswordByEmail(user));
    }

    @PostMapping("/update-token-by-email")
    public ResponseEntity<Integer> updateTokenByEmail(@RequestBody TokenByEmail tokenByEmail) {
        return ResponseEntity.ok(entityService.updateTokenByEmail(tokenByEmail));
    }

    @PostMapping("/update-token-by-old-token")
    public ResponseEntity<Integer> updateTokenByOldToken(@RequestBody TokenByOldToken tokenByOldToken) {
        return ResponseEntity.ok(entityService.updateTokenByOldToken(tokenByOldToken));
    }
}
