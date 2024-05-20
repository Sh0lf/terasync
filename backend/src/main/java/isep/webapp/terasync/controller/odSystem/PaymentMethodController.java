package isep.webapp.terasync.controller.odSystem;

import isep.webapp.terasync.controller.EntityController;
import isep.webapp.terasync.model.odSystem.Address;
import isep.webapp.terasync.model.odSystem.PaymentMethod;
import isep.webapp.terasync.service.odSystem.AddressService;
import isep.webapp.terasync.service.odSystem.PaymentMethodService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/payment-method")
public class PaymentMethodController extends EntityController<PaymentMethod, PaymentMethodService> {
    protected PaymentMethodController(PaymentMethodService entityService) {
        super(entityService, PaymentMethod.class);
    }
}
