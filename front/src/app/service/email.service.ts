import {Injectable} from "@angular/core";
import {environment} from "../../environment/environment.prod";
import {HttpClient} from "@angular/common/http";
import {Email} from "../model/email";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  protected apiServerUrl = environment.apiBackendUrl;
  protected constructor(protected http: HttpClient) {}

  public sendEmail(email: Email): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiServerUrl}/send-email`, email);
  }
}
