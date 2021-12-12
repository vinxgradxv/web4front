import {Injectable, OnInit} from "@angular/core";
import {EntryFormComponent} from "../../main-page/entry-form/entry-form.component";
import {GraphComponent} from "../../main-page/graph/graph.component";
import {TableComponent} from "../../main-page/table/table.component";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {StatusObject} from "../data/status-object";
import {RawEntry} from "../data/raw-entry";
import {Entry} from "../data/entry";
import {environment} from "../../../environments/environment";
import {AuthService} from "../auth-util/auth.service";

@Injectable({
  providedIn: 'root'
})
export class EntryService implements OnInit {


  private _graph: GraphComponent;
  private _table: TableComponent;
  private _form: EntryFormComponent;

  public entries: BehaviorSubject<Entry[]> = new BehaviorSubject<Entry[]>([]);

  constructor(private http: HttpClient) {
  }

  get form(): EntryFormComponent {
    return this._form;
  }

  set form(value: EntryFormComponent) {
    this._form = value;
  }

  get graph(): GraphComponent {
    return this._graph;
  }

  set graph(value: GraphComponent) {
    this._graph = value;
  }

  get table(): TableComponent {
    return this._table;
  }

  set table(value: TableComponent) {
    this._table = value;
  }

  addEntry(entry: RawEntry) {
    return this.http.post<Entry[]>(`${environment.apiBaseUrl}/api/add`, entry).subscribe(
      {
        next: (values: Entry[]) => {
          this.entries.next(values);
          if (values.length != 0) {
            let lastEntry = values.pop();
            values.push(lastEntry);
            this.graph.drawPoints(values, lastEntry.r);
          }
        }
      }
    );
  }

  getAllEntries() {
    return this.http.post<Entry[]>(`${environment.apiBaseUrl}/api/get-all`, JSON.parse(localStorage.getItem('statusObject'))).subscribe(
      {
        next: (values: Entry[]) => {
          this.entries.next(values);
          console.log(values.length);
          if (values.length != 0) {
            let lastEntry = values.pop();
            values.push(lastEntry);
            this.graph.drawPoints(values, lastEntry.r);
          }
        }
      }
    );
  }

  ngOnInit() {
    this.getAllEntries();
  }
}
