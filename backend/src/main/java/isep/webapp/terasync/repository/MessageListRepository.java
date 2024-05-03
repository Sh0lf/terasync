package isep.webapp.terasync.repository;

import isep.webapp.terasync.model.MessageList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface MessageListRepository extends JpaRepository<MessageList, Integer> {
    @Modifying
    @Query("DELETE FROM MessageList p WHERE p.messageListId = :id")
    Integer deleteEntityById(Integer id);
}
