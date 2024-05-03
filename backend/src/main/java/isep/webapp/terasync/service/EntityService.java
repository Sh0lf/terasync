package isep.webapp.terasync.service;

import isep.webapp.terasync.model.Entity;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public abstract class EntityService<T extends Entity, R extends JpaRepository<T, Integer>> {
    protected final R entityRepository;

    public EntityService(R entityRepository) {
        this.entityRepository = entityRepository;
    }

    public T addEntity(T entity) {
        return entityRepository.save(entity);
    }
    
    public List<T> findAllEntities() {
        return entityRepository.findAll();
    }

    public T findEntityById(int id) {
        return entityRepository.findById(id).
                orElseThrow(() -> new EntityNotFoundException("Entity not found with id: " + id));
    }

    public T updateEntity(T entity) {
        return entityRepository.save(entity);
    }

    public abstract Integer deleteEntityById(Integer id);
}
