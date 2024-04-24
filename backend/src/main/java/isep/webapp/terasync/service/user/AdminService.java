package isep.webapp.terasync.service.user;

import isep.webapp.terasync.model.misc.TokenByOldToken;
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
    public Admin findByEmail(String email) {
        return entityRepository.findByEmail(email);
    }

    @Override
    public Admin findByToken(String token) {
        return entityRepository.findByToken(token);
    }

    @Transactional
    @Override
    public Integer updatePasswordByEmail(Admin admin) {
        return entityRepository.updatePasswordByEmail(admin.getEmail(), admin.getPassword());
    }

    @Transactional
    @Override
    public Integer updateTokenByEmail(Admin admin) {
        return entityRepository.updateTokenByEmail(admin.getEmail(), admin.getToken());
    }

    @Override
    public Integer updateTokenByOldToken(TokenByOldToken tokenByOldToken) {
        return entityRepository.updateTokenByOldToken(tokenByOldToken.getOldToken(), tokenByOldToken.getNewToken());
    }
}
