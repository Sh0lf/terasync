import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductList } from '../../model/odSystem/product.list';
import { EntityService } from '../entity.service';

@Injectable({
  providedIn: 'root'
})
export class ProductListService extends EntityService<ProductList> {

  constructor(http: HttpClient) {
    super(http, "product-list");
  }
}
