package isep.webapp.terasync.model;

public abstract class Entity {
    public String getTableName() {
        return this.getClass().getSimpleName();
    }
}
