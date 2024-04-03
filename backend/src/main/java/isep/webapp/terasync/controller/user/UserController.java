package isep.webapp.terasync.controller.user;

import isep.webapp.terasync.controller.EntityController;
import isep.webapp.terasync.service.EntityService;

public abstract class UserController<T, S extends EntityService<T, ?>> extends EntityController<T, S> {

    protected UserController(S entityService) {
        super(entityService);
    }
}
