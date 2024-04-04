import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EntityService } from './entity.service';
import {RatingList} from "../model/rating.list";

@Injectable({
  providedIn: 'root'
})
export class RatingListService extends EntityService<RatingList> {

  constructor(http: HttpClient) {
    super(http, "ratingList");
  }
}
