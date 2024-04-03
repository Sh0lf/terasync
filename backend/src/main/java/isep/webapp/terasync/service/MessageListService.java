package isep.webapp.terasync.service;

import isep.webapp.terasync.model.MessageList;
import isep.webapp.terasync.repository.MessageListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MessageListService extends EntityService<MessageList, MessageListRepository> {
    @Autowired
    public MessageListService(MessageListRepository entityRepository) {
        super(entityRepository);
    }
}
