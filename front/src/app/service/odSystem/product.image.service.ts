import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductImage } from '../../model/odSystem/product.image';
import { EntityService } from '../entity.service';

@Injectable({
  providedIn: 'root'
})
export class ProductImageService extends EntityService<ProductImage> {

  constructor(http: HttpClient) {
    super(http, "productImage");
  }
}
