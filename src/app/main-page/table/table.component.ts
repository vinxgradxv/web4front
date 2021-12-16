import {Component, OnInit} from "@angular/core";
import {EntryService} from "../../shared/services/entry.service";
import {Entry} from "../../shared/data/entry";
import {AuthService} from "../../shared/services/auth.service";
import {InteractionService} from "../../shared/services/interaction.service";

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

  // constructor(private entryService: EntryService) {
  //   this.entryService.table = this;
  // }

  constructor(private interactionService: InteractionService) {
    this.interactionService.table = this;
  }

  ngOnInit() {
    this.interactionService.entries.subscribe(value => {
      this.entries = value;
    });
    // this.entryService.getInitEntries();
    this.interactionService.getAllEntries();
  }
}

