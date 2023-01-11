import {Component, ViewChild} from '@angular/core';
import {Entry} from "../../shared/data/entry";
import {RawEntry} from "../../shared/data/raw-entry";
import {EntryService} from "../../shared/services/entry.service";
import {BehaviorSubject} from "rxjs";
import {TableComponent} from "../table/table.component";
import {EntryFormComponent} from "../entry-form/entry-form.component";
import {GraphComponent} from "../graph/graph.component";
import {MessagesComponent} from "../messages/messages.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  @ViewChild(MessagesComponent) messagesComponent: MessagesComponent;
  @ViewChild(GraphComponent) graphComponent: GraphComponent;
  @ViewChild(EntryFormComponent) formComponent: EntryFormComponent;
  @ViewChild(TableComponent) tableComponent: TableComponent;
  r: number;

  public entries: BehaviorSubject<Entry[]> = new BehaviorSubject<Entry[]>([]);

  private errorHandler = (err) => {
    console.log("Error while processing request");
    this.messagesComponent.setResultMessages(["Error while processing request"]);
    console.log(err);
    if (err.status === 401) {
      console.log("error 401!");
      this.router.navigate(['login']);
    }
  };

  // @ts-ignore
  constructor(private entryService: EntryService,
              private router: Router) {
  }


  ngOnInit() {
    this.entries.subscribe(value => {
      this.tableComponent.entries = value;
    });
    this.getAllEntries();
  }


  onEntryAdd($event: RawEntry) {
    this.addEntry($event);
  }

  onValidationFail($event: string[]) {
    this.messagesComponent.setValidationMessages($event);
  }

  onRChanged($event: number) {
    this.graphComponent.drawDots($event, this.entries.value);
    this.messagesComponent.clearMessages();
  }

  onEntriesClear() {
    this.clearAllEntries();
  }

  onMessagesClear() {
    this.messagesComponent.clearMessages();
  }


  onGraphEntryAdd($event: RawEntry) {
    this.onEntryAdd($event);
    if (this.formComponent.entryForm.get("r").invalid) {
      this.onMessagesClear();
      this.formComponent.entryForm.get("r").setValue($event.r);
    }
    this.formComponent.entryForm.get("y").setValue($event.y);
    this.formComponent.entryForm.get("x").setValue($event.x);
  }



  getAllEntries() {
    this.entryService.getAll().subscribe(
      {
        next: (values: Entry[]) => {
          values = values.sort((res1, res2) => res1.id - res2.id);
          for (let value of values) {
            value.date = this.makeDateLocal(value.date);
          }
          this.entries.next(values);
          if (values.length != 0) {
            console.log("get all");
            let lastEntry = values.pop();
            values.push(lastEntry);
            this.formComponent.entryForm.get("r").setValue(1);
            this.graphComponent.drawDots(1, this.entries.value);
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
          console.log("NO error");
          values = values.sort((res1, res2) => res1.id - res2.id);
          for (let value of values) {
            value.date = this.makeDateLocal(value.date);
          }
          this.entries.next(values);
          if (values.length != 0) {
            let lastEntry = values.pop();
            values.push(lastEntry);
            console.log(lastEntry);
            this.graphComponent.drawDots(lastEntry.r, this.entries.value);
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
          this.graphComponent.clearPoints(this.formComponent.entryForm.get("r").value);
        },
        error: this.errorHandler
      }
    );
  }

  drawDot($event: any) {
    this.graphComponent.drawDot($event.x, $event.y, $event.valid);
  }

  makeDateLocal(date: string) {
    const serverDate = new Date(date);
    const serverHours = serverDate.getHours();
    const serverMinutes = serverDate.getMinutes();
    const serverSeconds = serverDate.getSeconds();
    const offset = new Date().getTimezoneOffset() + 180;
    const localSeconds = serverSeconds;
    const localMinutes = (serverMinutes - offset) % 60;
    const localHours = (serverHours + (serverMinutes - offset) / 60) % 24;
    let localDate = new Date();
    localDate.setSeconds(localSeconds);
    localDate.setMinutes(localMinutes);
    localDate.setHours(localHours);
    return localDate.toLocaleTimeString();
  }
}
