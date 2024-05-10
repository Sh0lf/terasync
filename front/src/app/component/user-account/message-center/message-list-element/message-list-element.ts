import {MessageList} from "../../../../model/message.list";
import {
  adminCategory, businessCategory,
  customerCategory,
  deliveryPersonCategory, deliveryServiceCategory,
  UserCategory
} from "../../../../service/user/userCategories";

export class MessageListElement {
  messageList: MessageList;
  messageType: MessageType | undefined
  position: MessagePosition;

  constructor(messageList: MessageList, currentUserId: number, currentUserCategory: UserCategory) {
    this.messageList = messageList;
    this.messageType = this.setMessageType(messageList);
    this.position = this.setPosition(messageList, currentUserId, currentUserCategory)
  }

  private setMessageType(messageList: MessageList) {
    if (messageList.adminId > 0) {
      return adminMessageType;
    } else if (messageList.customerId > 0) {
      return customerMessageType;
    } else if (messageList.deliveryPersonId > 0) {
      return deliveryPersonMessageType;
    } else if (messageList.deliveryServiceId > 0) {
      return deliveryServiceMessageType;
    } else if (messageList.businessId > 0) {
      return businessMessageType;
    }
    return undefined
  }

  private setPosition(messageList: MessageList, currentUserId: number, currentUserCategory: UserCategory) {
    if ((messageList.adminId == currentUserId && currentUserCategory.name == adminCategory.name) ||
      (messageList.customerId == currentUserId && currentUserCategory.name == customerCategory.name) ||
      (messageList.deliveryPersonId == currentUserId && currentUserCategory.name == deliveryPersonCategory.name) ||
      (messageList.deliveryServiceId == currentUserId && currentUserCategory.name == deliveryServiceCategory.name) ||
      (messageList.businessId == currentUserId && currentUserCategory.name == businessCategory.name)) {
      return MessagePosition.END;
    }


    else {
      return MessagePosition.START;
    }
  }
}

class MessageType {
  userCategory: UserCategory;
  backgroundClass: string;

  constructor(userCategory: UserCategory, backgroundClass: string) {
    this.userCategory = userCategory;
    this.backgroundClass = backgroundClass;
  }
}

enum MessagePosition {
  START = "start",
  END = "end",
}

export const adminMessageType = new MessageType(adminCategory, "admin-message-type");
export const customerMessageType = new MessageType(customerCategory, "customer-message-type");
export const deliveryPersonMessageType = new MessageType(deliveryPersonCategory, "delivery-person-message-type");
export const deliveryServiceMessageType = new MessageType(deliveryServiceCategory, "delivery-service-message-type");
export const businessMessageType = new MessageType(businessCategory, "business-message-type");
