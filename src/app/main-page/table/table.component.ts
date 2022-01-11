import {Component, OnInit} from "@angular/core";
import {Entry} from "../../shared/data/entry";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  xColumnLabel: string = "X";
  yColumnLabel: string = "Y";
  rColumnLabel: string = "R";
  hitColumnLabel: string = "Hit result";
  entries: Entry[];

}

