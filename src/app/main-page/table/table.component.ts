import {Component, OnInit} from "@angular/core";
import {EntryService} from "../../shared/entry-util/entry.service";
import {Entry} from "../../shared/data/entry";
import {AuthService} from "../../shared/auth-util/auth.service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  xColumnLabel: string = "X";
  yColumnLabel: string = "Y";
  rColumnLabel: string = "R";
  hitColumnLabel: string = "Hit result";
  entries: Entry[];

  constructor(private entryService: EntryService) {
    this.entryService.table = this;
  }

  ngOnInit() {
    this.entryService.entries.subscribe(value => {
      this.entries = value;
    });
    this.entryService.getInitEntries();
  }
}

