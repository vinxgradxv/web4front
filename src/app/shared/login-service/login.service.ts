import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../data/user";
import {StatusObject} from "../data/status-object";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiServerURL: string = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }
  sendSignInRequest(user: User, register: boolean):Observable<StatusObject> {
    console.log(register);
    console.log(`${this.apiServerURL}/api/register`);
    if (register) return this.http.post<StatusObject>(`${this.apiServerURL}/api/register`, user);
    return this.http.post<StatusObject>(`${this.apiServerURL}/api/auth`, user);
  }

}
