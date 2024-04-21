package isep.webapp.terasync.service.user;

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
    public Integer updatePassword(String email, String password) {
        return entityRepository.updatePassword(email, password);
    }

}
