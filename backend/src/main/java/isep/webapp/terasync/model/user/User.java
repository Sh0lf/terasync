package isep.webapp.terasync.model.user;

import isep.webapp.terasync.model.Entity;

public abstract class User extends Entity {
    public abstract int getUserId();
    public abstract String getName();
    public abstract String getEmail();
    public abstract String getUsername();
    public abstract String getPassword();
    public abstract String getToken();
    public abstract String getRegistrationDate();
    public abstract boolean getEmailVerified();
    public abstract String getPfpImgPath();
}
