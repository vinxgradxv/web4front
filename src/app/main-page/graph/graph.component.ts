import {Component} from "@angular/core";
import {EntryService} from "../../shared/entry-util/entry.service";
import {Entry} from "../../shared/data/entry";
import {Point} from "../../shared/data/point";

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent {

  svgHeight: number = 240;
  svgWidth: number = 300;
  hwRelation: number = 0.8;
  points: Point[];

  constructor(private entryService: EntryService) {
    this.entryService.graph = this;
  }

  yAxisArrowCalc(): string {
    //arrow scaling
    return "" + (this.svgWidth / 2) + "," + "0" + " "
      + (this.svgWidth / 2 - 0.02 * this.svgWidth) + "," + (0.0625 * this.svgHeight) + " "
      + (this.svgWidth / 2 + 0.02 * this.svgWidth) + "," + (0.0625 * this.svgHeight);
  }


  //300,120 285,126 285,114
  xAxisArrowCalc(): string {
    //arrow scaling
    return "" + (this.svgWidth) + "," + (this.svgHeight / 2) + " "
      + (this.svgWidth - 0.05 * this.svgWidth) + "," + (this.svgHeight / 2 + 0.025 * this.svgHeight) + " "
      + (this.svgWidth - 0.05 * this.svgWidth) + "," + (this.svgHeight / 2 - 0.025 * this.svgHeight);
  }

  rectangleCoordsCalc(): string {
    return "" + (this.svgWidth / 2) + "," + (this.svgHeight / 2) + " "
      + (this.svgWidth / 2 - 2 * this.svgWidth / 6) + "," + (this.svgHeight / 2) + " "
      + (this.svgWidth / 2 - 2 * this.svgWidth / 6) + "," + (this.svgHeight / 2 - 2 * this.svgWidth / 6) + " "
      + (this.svgWidth / 2) + "," + (this.svgHeight / 2 - 2 * this.svgWidth / 6);
  }

  //"M 150 70 A 50 50 0 0 1 200 120 V 120 H 150"
  circleCoordsCalc(): string {
    return "M " + (this.svgWidth / 2) + " " + (this.svgHeight / 2 - this.svgWidth / 6)
      + " A 50 50 0 0 1 " + (4 * this.svgWidth / 6) + " " + (this.svgHeight / 2)
      + " V " + (this.svgHeight / 2) + " H " + (this.svgWidth / 2);
  }

  //150,120 250,120 150,170
  triangleCoordsCalc(): string {
    return "" + (this.svgWidth / 2) + "," + (this.svgHeight / 2) + " "
      + (this.svgWidth / 2) + "," + (this.svgHeight / 2 + this.svgWidth / 6) + " "
      + (this.svgWidth / 2 - this.svgWidth / 6) + "," + (this.svgHeight / 2);
  }

  drawPoints(values: Entry[]): void {
    this.points = [];
    values.forEach((value: Entry) => {
      let {absoluteX, absoluteY} = this.getAbsoluteOffsetFromXYCoords(value.x, value.y, value.r);
      this.points.push({cx:absoluteX, cy:absoluteY, fill:"white"})
    })
    console.log(this.points);
  }

  private getAbsoluteOffsetFromXYCoords(x, y, r) {
    let relativeX = x * 100 / r;
    let relativeY = y * 100 / r;
    return {
      absoluteX: this.svgWidth/2 + Math.round(relativeX),
      absoluteY: this.svgHeight/2 - Math.round(relativeY)
    }
  }

}
