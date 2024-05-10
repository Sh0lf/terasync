import {Admin} from "./user/admin";
import {Business} from "./user/business";
import {DeliveryService} from "./user/delivery.service";
import {DeliveryPerson} from "./user/delivery.person";
import {Customer} from "./user/customer";
import {User} from "./user/user";

export class MessageList {
  messageListId: number | undefined;
  message: string;
  timestamp: string | undefined;
  customerOrderId: number;
  adminId: number;
  customerId: number;
  deliveryPersonId: number;
  deliveryServiceId: number;
  businessId: number;

  messageUserOwner!: User | undefined;

  constructor(message: string, customerOrderId: number, adminId: number,
              customerId: number, deliveryPersonId: number, deliveryServiceId: number,
              businessId: number, timestamp?: string, messageListId?: number) {
    this.messageListId = messageListId;
    this.message = message;
    this.timestamp = timestamp;
    this.customerOrderId = customerOrderId;
    this.adminId = adminId;
    this.customerId = customerId;
    this.deliveryPersonId = deliveryPersonId;
    this.deliveryServiceId = deliveryServiceId;
    this.businessId = businessId;
  }

  static fromJson(jsonMessageList: MessageList) {
    return new MessageList(jsonMessageList.message, jsonMessageList.customerOrderId,
      jsonMessageList.adminId, jsonMessageList.customerId, jsonMessageList.deliveryPersonId,
      jsonMessageList.deliveryServiceId, jsonMessageList.businessId, jsonMessageList.timestamp, jsonMessageList.messageListId)
  }

  static initializeMessageLists(json: { messageLists: MessageList[] }) {
    let messageLists: MessageList[] = [];
    if (json.messageLists) {
      for (let messageList of json.messageLists) {
        messageLists.push(MessageList.fromJson(messageList));
      }
    }
    return messageLists;
  }
}

