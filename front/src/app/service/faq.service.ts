import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EntityService} from './entity.service';
import {Faq} from "../model/faq";

@Injectable({
  providedIn: 'root'
})
export class FaqService extends EntityService<Faq> {

  constructor(http: HttpClient) {
    super(http, "faq");
  }

}
