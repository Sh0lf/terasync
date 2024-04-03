package isep.webapp.terasync.controller;

import isep.webapp.terasync.model.MessageList;
import isep.webapp.terasync.service.MessageListService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/message-list")
public class MessageListController extends EntityController<MessageList, MessageListService> {
    protected MessageListController(MessageListService entityService) {
        super(entityService);
    }
}
