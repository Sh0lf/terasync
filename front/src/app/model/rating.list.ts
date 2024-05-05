export class RatingList {
  ratingListId: number | undefined;
  rating: number;
  comment: string;
  ratingDate: string;
  customerId: number;
  businessId: number;


  constructor(rating: number, comment: string, ratingDate: string, customerId: number,
              businessId: number, ratingListId?: number) {
    this.ratingListId = ratingListId;
    this.rating = rating;
    this.comment = comment;
    this.ratingDate = ratingDate;
    this.customerId = customerId;
    this.businessId = businessId;
  }

  public static fromJson(json: RatingList): RatingList {
    return new RatingList(json.rating, json.comment, json.ratingDate, json.customerId, json.businessId, json.ratingListId);
  }

  static initializeRatingLists(jsonUser: {ratingLists: RatingList[] | undefined}): RatingList[] {
    let ratingLists: RatingList[] = [];
    if (jsonUser.ratingLists != undefined) {
      for (let ratingList of jsonUser.ratingLists) {
        ratingLists.push(RatingList.fromJson(ratingList));
      }
    }
    return ratingLists;
  }
}

