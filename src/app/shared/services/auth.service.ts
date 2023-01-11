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

  private apiServerURL: string = window["apiBaseUrl"];
  private statusObjectObservable: Observable<StatusObject>;
  private statusObject: BehaviorSubject<StatusObject>;
  private stObj: string = "    {\n" +
    "   \"login\": \"" + "test" + "\",\n" +
    "   \"password\": \"" + "testtest" + "\",\n" +
    "   \"status\": \"" + false + "\"\n" +
    "   }";

  constructor(private http: HttpClient) {
    try {
      this.statusObject = new BehaviorSubject<StatusObject>(JSON.parse(sessionStorage.getItem('statusObject')));
    }
    catch (SyntaxError) {
      this.statusObject = new BehaviorSubject<StatusObject>(JSON.parse(this.stObj));
    }
    this.statusObjectObservable = this.statusObject.asObservable();
  }

  public get getStatusObject():StatusObject {
    return this.statusObject.getValue();
  }

  public get getStatusObjectObservable():Observable<StatusObject> {
    return this.statusObjectObservable;
  }

  sendSignInRequest(user: User, register: boolean): Observable<StatusObject> {
    if (register) return this.http.post<StatusObject>(`${this.apiServerURL}/signup`, user);
    return this.http.post<StatusObject>(`${this.apiServerURL}/signin`, user);
  }

  logIn(user: User, register: boolean) {
    let result: Observable<StatusObject> = this.sendSignInRequest(user, register);
    return result.pipe(map(statusObj => {
      sessionStorage.setItem("statusObject", JSON.stringify(statusObj));
      this.statusObject.next(statusObj);
      return statusObj;
    }));
  }

    logOut() {
      console.log("Logout...");
      sessionStorage.removeItem('statusObject');
      this.statusObject.next(null);
    }

}
