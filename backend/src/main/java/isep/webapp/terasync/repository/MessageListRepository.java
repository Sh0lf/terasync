package isep.webapp.terasync.repository;

import isep.webapp.terasync.model.MessageList;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageListRepository extends JpaRepository<MessageList, Integer> {
}
