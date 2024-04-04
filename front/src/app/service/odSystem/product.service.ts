import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../model/odSystem/product';
import { EntityService } from '../entity.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends EntityService<Product> {

  constructor(http: HttpClient) {
    super(http, "product");
  }
}
