import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class InternalObjectService<T> {
  private object!: T;

  protected constructor() {
  }

  setObject(user: T) {
    this.object = user;
  }

  getObject(): T {
    return this.object;
  }
}
