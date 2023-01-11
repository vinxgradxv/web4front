import {Injectable, OnInit} from "@angular/core";
import {EntryFormComponent} from "../../main-page/entry-form/entry-form.component";
import {GraphComponent} from "../../main-page/graph/graph.component";
import {TableComponent} from "../../main-page/table/table.component";
import {HttpClient, HttpParams} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {RawEntry} from "../data/raw-entry";
import {Entry} from "../data/entry";

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  private apiServerURL: string = window["apiBaseUrl"];

  constructor(private http: HttpClient) {
  }

  addNewEntry(entry: RawEntry) {
    return this.http.post<Entry[]>(`${this.apiServerURL}/hits/add`, entry);
  }

  getAll(): Observable<Entry[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("username",JSON.parse(sessionStorage.getItem("statusObject")).username);
    queryParams = queryParams.append("token",JSON.parse(sessionStorage.getItem("statusObject")).password);
    return this.http.get<Entry[]>(`${this.apiServerURL}/hits/get`, {params: queryParams} );
  }

  clearAll(): Observable<Entry[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("username",JSON.parse(sessionStorage.getItem("statusObject")).name);
    queryParams = queryParams.append("token",JSON.parse(sessionStorage.getItem("statusObject")).password);

    return this.http.delete<Entry[]>(`${this.apiServerURL}/hits/delete`, {params: queryParams});
  }

}
