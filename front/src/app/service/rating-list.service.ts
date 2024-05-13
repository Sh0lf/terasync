import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EntityService } from './entity.service';
import {RatingList} from "../model/rating.list";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RatingListService extends EntityService<RatingList> {

  constructor(http: HttpClient) {
    super(http, "rating-list");
  }

  public findByCustomerOrderId(customerOrderId: number): Observable<RatingList> {
    return this.http.get<RatingList>(`${this.apiBackendUrl}/${this.entityName}/find-by-customer-order-id/${customerOrderId}`);
  }

  public getRatingAverage(ratings: RatingList[] | undefined): number {
    let ratingAverage: number = 0;
    if (ratings){
      for (let rating of ratings){
        ratingAverage = rating.rating;
      }
      ratingAverage = ratingAverage/(ratings.length);
    }
    return ratingAverage
  }
}
