package isep.webapp.terasync.service.user;

import isep.webapp.terasync.model.user.Admin;
import isep.webapp.terasync.model.user.Customer;
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

    @Override
    public Integer updatePassword(String email, String password) {
        return entityRepository.updatePassword(email, password);
    }

    @Transactional
    @Override
    public Integer updateToken(String email, String token) {
        return entityRepository.updateToken(email, token);
    }
}
