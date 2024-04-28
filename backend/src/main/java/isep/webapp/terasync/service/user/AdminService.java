package isep.webapp.terasync.service.user;

import isep.webapp.terasync.model.query.select.ByToken;
import isep.webapp.terasync.model.query.update.PasswordByEmail;
import isep.webapp.terasync.model.query.update.PfpImgPathByEmail;
import isep.webapp.terasync.model.query.update.TokenByEmail;
import isep.webapp.terasync.model.query.update.TokenByOldToken;
import isep.webapp.terasync.model.user.Admin;
import isep.webapp.terasync.repository.user.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AdminService extends UserService<Admin, AdminRepository> {

    @Autowired
    public AdminService(AdminRepository adminRepository) {
        super(adminRepository);
    }

    @Override
    public Admin selectByEmail(String email) {
        return entityRepository.findByEmail(email);
    }

    @Override
    public Admin selectByToken(ByToken byToken) {
        return entityRepository.findByToken(byToken.getToken());
    }

    @Transactional
    public Integer verifyEmail(String email) {
        return entityRepository.verifyEmail(email);
    }

    @Transactional
    @Override
    public Integer updatePasswordByEmail(PasswordByEmail passwordByEmail) {
        return entityRepository.updatePasswordByEmail(passwordByEmail.getEmail(), passwordByEmail.getNewPassword());
    }

    @Transactional
    @Override
    public Integer updateTokenByEmail(TokenByEmail tokenByEmail) {
        return entityRepository.updateTokenByEmail(tokenByEmail.getEmail(), tokenByEmail.getNewToken());
    }

    @Transactional
    @Override
    public Integer updateTokenByOldToken(TokenByOldToken tokenByOldToken) {
        return entityRepository.updateTokenByOldToken(tokenByOldToken.getOldToken(), tokenByOldToken.getNewToken());
    }

    @Transactional
    @Override
    public Integer updatePfpImgPathByEmail(PfpImgPathByEmail pfpImgPathByEmail) {
        return entityRepository.updatePfpImgPathByEmail(pfpImgPathByEmail.getEmail(), pfpImgPathByEmail.getPfpImgPath());
    }
}
