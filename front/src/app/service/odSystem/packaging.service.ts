import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Packaging } from '../../model/odSystem/packaging';
import { EntityService } from '../entity.service';

@Injectable({
  providedIn: 'root'
})
export class PackagingService extends EntityService<Packaging> {

  constructor(http: HttpClient) {
    super(http, "packaging");
  }
}
