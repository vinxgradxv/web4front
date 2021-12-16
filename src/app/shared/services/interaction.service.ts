import {Injectable} from "@angular/core";
import {EntryService} from "./entry.service";
import {GraphComponent} from "../../main-page/graph/graph.component";
import {TableComponent} from "../../main-page/table/table.component";
import {EntryFormComponent} from "../../main-page/entry-form/entry-form.component";
import {Entry} from "../data/entry";
import {BehaviorSubject} from "rxjs";
import {RawEntry} from "../data/raw-entry";
import {MessagesComponent} from "../../main-page/messages/messages.component";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  private _graph: GraphComponent;
  private _table: TableComponent;
  private _form: EntryFormComponent;
  private _messages: MessagesComponent;

  public entries: BehaviorSubject<Entry[]> = new BehaviorSubject<Entry[]>([]);

  private errorHandler = (err) => {
    console.log("Error while processing request");
    this.messages.resultMessages = ["Error while processing request"];
    this.messages.resultError = true;
    console.log(err);
    if (err.status === 401) {
      console.log("error 401!");
      this.router.navigate(['login']);
    }
  };

  constructor(private entryService: EntryService,
              private router: Router) {
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

  get messages(): MessagesComponent {
    return this._messages;
  }

  set messages(value: MessagesComponent) {
    this._messages = value;
  }


  getAllEntries() {
    this.entryService.getAll().subscribe(
      {
        next: (values: Entry[]) => {
          values = values.sort((res1, res2) => res1.id - res2.id);
          this.entries.next(values);
          console.log("get all");
          if (values.length != 0) {
            let lastEntry = values.pop();
            values.push(lastEntry);
            this.form.entryForm.get("r").setValue(lastEntry.r);
            this.graph.drawDots(lastEntry.r);
          }
        },
        error: this.errorHandler
      }
    );
  }

  addEntry(entry: RawEntry) {
    this.entryService.addNewEntry(entry).subscribe(
      {
        next: (values: Entry[]) => {
          values = values.sort((res1, res2) => res1.id - res2.id);
          this.entries.next(values);
          if (values.length != 0) {
            let lastEntry = values.pop();
            values.push(lastEntry);
            this.graph.drawDots(lastEntry.r);
          }
        },
        error: this.errorHandler
      }
    );
  }

  clearAllEntries() {
    this.entryService.clearAll().subscribe({
        next: (values: Entry[]) => {
          console.log("clear");
          this.entries.next(values);
          this.graph.clearPoints();
        },
        error: this.errorHandler
      }
    );
  }
}
