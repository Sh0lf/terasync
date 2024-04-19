import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductMenuList } from '../../model/odSystem/product.menu.list';
import { EntityService } from '../entity.service';

@Injectable({
  providedIn: 'root'
})
export class ProductMenuListService extends EntityService<ProductMenuList> {

  constructor(http: HttpClient) {
    super(http, "productMenuList");
  }
}
