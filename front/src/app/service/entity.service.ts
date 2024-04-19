import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environment/environment.prod";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export abstract class EntityService<T> {
  protected apiServerUrl = environment.apiBaseUrl;
  protected readonly entityName: String;

  protected constructor(protected http: HttpClient, entityName: String) {
    this.entityName = entityName;
  }

  public getEntities(): Observable<T[]> {
    return this.http.get<T[]>(`${this.apiServerUrl}/${this.entityName}/all`);
  }

  public addEntity(entity: T): Observable<T> {
    return this.http.post<T>(`${this.apiServerUrl}/${this.entityName}/add`, entity);
  }

  public updateEntity(entity: T): Observable<T> {
    return this.http.put<T>(`${this.apiServerUrl}/${this.entityName}/update`, entity);
  }

  public deleteEntity(entityId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/${this.entityName}/delete/${entityId}`);
  }

  public getEntityById(entityId: number): Observable<T> {
    return this.http.get<T>(`${this.apiServerUrl}/${this.entityName}/find/${entityId}`);
  }
}

