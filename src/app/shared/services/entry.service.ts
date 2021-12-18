import {Injectable, OnInit} from "@angular/core";
import {EntryFormComponent} from "../../main-page/entry-form/entry-form.component";
import {GraphComponent} from "../../main-page/graph/graph.component";
import {TableComponent} from "../../main-page/table/table.component";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {RawEntry} from "../data/raw-entry";
import {Entry} from "../data/entry";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  private apiServerURL: string = window["apiBaseUrl"];

  constructor(private http: HttpClient) {
  }

  addNewEntry(entry: RawEntry) {
    return this.http.post<Entry[]>(`${this.apiServerURL}/api/add`, entry);
  }

  getAll(): Observable<Entry[]> {
    return this.http.post<Entry[]>(`${this.apiServerURL}/api/get-all`, JSON.parse(localStorage.getItem('statusObject')));
  }

  clearAll(): Observable<Entry[]> {
    return this.http.post<Entry[]>(`${this.apiServerURL}/api/clear`, JSON.parse(localStorage.getItem('statusObject')));
  }

}
