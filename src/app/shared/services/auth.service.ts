import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, Observable} from "rxjs";
import {User} from "../data/user";
import {StatusObject} from "../data/status-object";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiServerURL: string = environment.apiBaseUrl;
  private statusObjectObservable: Observable<StatusObject>;
  private statusObject: BehaviorSubject<StatusObject>;

  constructor(private http: HttpClient) {
    this.statusObject = new BehaviorSubject<StatusObject>(JSON.parse(localStorage.getItem('statusObject')));
    this.statusObjectObservable = this.statusObject.asObservable();
  }

  public get getStatusObject():StatusObject {
    return this.statusObject.getValue();
  }

  public get getStatusObjectObservable():Observable<StatusObject> {
    return this.statusObjectObservable;
  }

  sendSignInRequest(user: User, register: boolean): Observable<StatusObject> {
    if (register) return this.http.post<StatusObject>(`${this.apiServerURL}/user/register`, user);
    return this.http.post<StatusObject>(`${this.apiServerURL}/user/auth`, user);
  }

  logIn(user: User, register: boolean) {
    let result: Observable<StatusObject> = this.sendSignInRequest(user, register);
    return result.pipe(map(statusObj => {
      localStorage.setItem("statusObject", JSON.stringify(statusObj));
      this.statusObject.next(statusObj);
      return statusObj;
    }));
  }

    logOut() {
      console.log("Logout...");
      localStorage.removeItem('statusObject');
      this.statusObject.next(null);
    }

}
