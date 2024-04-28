package isep.webapp.terasync.controller.user;

import isep.webapp.terasync.controller.EntityController;
import isep.webapp.terasync.model.Entity;
import isep.webapp.terasync.model.query.select.ByToken;
import isep.webapp.terasync.model.query.update.PasswordByEmail;
import isep.webapp.terasync.model.query.update.PfpImgPathByEmail;
import isep.webapp.terasync.model.query.update.TokenByEmail;
import isep.webapp.terasync.model.query.update.TokenByOldToken;
import isep.webapp.terasync.service.user.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public abstract class UserController<T extends Entity, S extends UserService<T, ?>> extends EntityController<T, S> {

    protected UserController(S entityService, Class<T> entityClass) {
        super(entityService, entityClass);
    }
    @GetMapping("/select-user-by-email/{email}")
    public ResponseEntity<T> selectCustomerByEmail(@PathVariable("email") String email) {
        return ResponseEntity.ok(entityService.selectByEmail(email));
    }

    @PostMapping("/select-user-by-token")
    public ResponseEntity<T> selectCustomerByToken(@RequestBody ByToken byToken) {
        return ResponseEntity.ok(entityService.selectByToken(byToken));
    }

    @GetMapping("/verify-email/{email}")
    public ResponseEntity<Integer> verifyEmail(@PathVariable("email") String email) {
        return ResponseEntity.ok(entityService.verifyEmail(email));
    }

    @PostMapping("/update-password-by-email")
    public ResponseEntity<Integer> updatePasswordByEmail(@RequestBody PasswordByEmail passwordByEmail) {
        return ResponseEntity.ok(entityService.updatePasswordByEmail(passwordByEmail));
    }

    @PostMapping("/update-token-by-email")
    public ResponseEntity<Integer> updateTokenByEmail(@RequestBody TokenByEmail tokenByEmail) {
        return ResponseEntity.ok(entityService.updateTokenByEmail(tokenByEmail));
    }

    @PostMapping("/update-token-by-old-token")
    public ResponseEntity<Integer> updateTokenByOldToken(@RequestBody TokenByOldToken tokenByOldToken) {
        return ResponseEntity.ok(entityService.updateTokenByOldToken(tokenByOldToken));
    }

    @PostMapping("/update-pfp-img-path-by-email")
    public ResponseEntity<Integer> updatePfpImgPathByEmail(@RequestBody PfpImgPathByEmail pfpImgPathByEmail) {
        return ResponseEntity.ok(entityService.updatePfpImgPathByEmail(pfpImgPathByEmail));
    }

    @Override
    public ResponseEntity<List<String>> uploadFiles(@RequestParam("files") List<MultipartFile> multipartFiles)
            throws IOException {
        List<String> fileNames = fileService.uploadFiles(multipartFiles, entityClass.getSimpleName().toLowerCase());

        return ResponseEntity.ok(fileNames);
    }
}
