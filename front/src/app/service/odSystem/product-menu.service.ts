import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductMenu } from '../../model/odSystem/product.menu';
import { EntityService } from '../entity.service';

@Injectable({
  providedIn: 'root'
})
export class ProductMenuService extends EntityService<ProductMenu> {

  constructor(http: HttpClient) {
    super(http, "productMenu");
  }
}
