export class MessageList {
  messageListId: number | undefined;
  message: string;
  timestamp: string;
  ownerId: number;
  customerOrderId: number;

  constructor(message: string, timestamp: string, ownerId: number, customerOrderId: number, messageListId?: number) {
    this.messageListId = messageListId;
    this.message = message;
    this.timestamp = timestamp;
    this.ownerId = ownerId;
    this.customerOrderId = customerOrderId;
  }

  static fromJson(jsonMessageList: MessageList) {
    return new MessageList(jsonMessageList.message, jsonMessageList.timestamp,
      jsonMessageList.ownerId, jsonMessageList.customerOrderId, jsonMessageList.messageListId);
  }

  static initializeMessageLists(json: {messageLists: MessageList[]}) {
    let messageLists: MessageList[] = [];
    if (json.messageLists) {
      for (let messageList of json.messageLists) {
        messageLists.push(MessageList.fromJson(messageList));
      }
    }
    return messageLists;
  }
}

