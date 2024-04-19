package isep.webapp.terasync.service.user;

import isep.webapp.terasync.model.user.Customer;
import isep.webapp.terasync.repository.user.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerService extends UserService<Customer, CustomerRepository> {

    @Autowired
    public CustomerService(CustomerRepository customerRepository) {
        super(customerRepository);
    }

    public Customer findByEmail(String email) {
        return entityRepository.findByEmail(email);
    }

}
