package isep.webapp.terasync.model;

public abstract class Entity {
    public String getEntityName() {
        return this.getClass().getSimpleName();
    }
}
