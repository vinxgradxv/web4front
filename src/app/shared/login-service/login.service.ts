import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../data/user";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiServerURL: string = "localhost:8080";

  constructor(private http: HttpClient) {
  }

  sout():void {
    console.log(this.apiServerURL);
  }

  signIn(user: User):Observable<User> {
    return this.http.post<User>(this.apiServerURL, user);
  }

}
