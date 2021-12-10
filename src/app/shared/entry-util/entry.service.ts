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

  public entries: BehaviorSubject<Entry[]> = new BehaviorSubject<Entry[]>([]);

  constructor(private http: HttpClient, private authService: AuthService) {
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
          this.graph.drawPoints(values);
        }
      }
    );
  }

  getAllEntries() {
    return this.http.post<Entry[]>(`${environment.apiBaseUrl}/api/get-all`, this.authService.getStatusObject).subscribe(
      {
        next: (values: Entry[]) => {
          this.entries.next(values);
          this.graph.drawPoints(values);
        }
      }
    );
  }

  ngOnInit() {
    this.getAllEntries();
  }
}
