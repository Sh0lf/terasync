import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EntityService } from './entity.service';
import {MessageList} from "../model/message.list";

@Injectable({
  providedIn: 'root'
})
export class MessageListService extends EntityService<MessageList> {

  constructor(http: HttpClient) {
    super(http, "message-list");
  }

}
