package isep.webapp.terasync.service.user;

import isep.webapp.terasync.model.misc.TokenByOldToken;
import isep.webapp.terasync.model.user.Customer;
import isep.webapp.terasync.repository.user.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CustomerService extends UserService<Customer, CustomerRepository> {

    @Autowired
    public CustomerService(CustomerRepository customerRepository) {
        super(customerRepository);
    }

    @Override
    public Customer findByEmail(String email) {
        return entityRepository.findByEmail(email);
    }

    @Override
    public Customer findByToken(String token) {
        return entityRepository.findByToken(token);
    }

    @Transactional
    public Integer verifyEmail(String email) {
        return entityRepository.verifyEmail(email);
    }

    @Transactional
    @Override
    public Integer updatePasswordByEmail(Customer customer) {
        return entityRepository.updatePasswordByEmail(customer.getEmail(), customer.getPassword());
    }

    @Transactional
    @Override
    public Integer updateTokenByEmail(Customer customer) {
        return entityRepository.updateTokenByEmail(customer.getEmail(), customer.getToken());
    }

    @Override
    public Integer updateTokenByOldToken(TokenByOldToken tokenByOldToken) {
        return entityRepository.updateTokenByOldToken(tokenByOldToken.getOldToken(), tokenByOldToken.getNewToken());
    }

}
