import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {Entry} from "../../shared/data/entry";
import {Point} from "../../shared/data/point";
import {StatusObject} from "../../shared/data/status-object";
import {RawEntry} from "../../shared/data/raw-entry";

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  svgHeight: number = 240;
  svgWidth: number = 300;
  points: Point[] = [];
  r: number;

  dotRadius: number = 0;
  dotCx: number = 0;
  dotCy: number = 0;

  HitColor: string = "green";
  MissColor: string = "red";

  @Output() validationFail = new EventEmitter<string[]>();
  @Output() addGraphEntry = new EventEmitter<RawEntry>();

  ngOnInit() {
  }

  yAxisArrowCalc(): string {
    return "" + (this.svgWidth / 2) + "," + "0" + " "
      + (this.svgWidth / 2 - 0.02 * this.svgWidth) + "," + (0.0625 * this.svgHeight) + " "
      + (this.svgWidth / 2 + 0.02 * this.svgWidth) + "," + (0.0625 * this.svgHeight);
  }

  xAxisArrowCalc(): string {
    //arrow scaling
    return "" + (this.svgWidth) + "," + (this.svgHeight / 2) + " "
      + (this.svgWidth - 0.05 * this.svgWidth) + "," + (this.svgHeight / 2 + 0.025 * this.svgHeight) + " "
      + (this.svgWidth - 0.05 * this.svgWidth) + "," + (this.svgHeight / 2 - 0.025 * this.svgHeight);
  }

  rectangleCoordsCalc(): string {
    return "" + (this.svgWidth / 2) + "," + (this.svgHeight / 2) + " "
      + (this.svgWidth / 2 - 2 * this.svgWidth / 6) + "," + (this.svgHeight / 2) + " "
      + (this.svgWidth / 2 - 2 * this.svgWidth / 6) + "," + (this.svgHeight / 2 - this.svgWidth / 6) + " "
      + (this.svgWidth / 2) + "," + (this.svgHeight / 2 - this.svgWidth / 6);
  }

  circleCoordsCalc(): string {
    return "M " + (this.svgWidth / 2) + " " + (this.svgHeight / 2 - this.svgWidth / 6)
      + " A 50 50 0 0 1 " + (4 * this.svgWidth / 6) + " " + (this.svgHeight / 2)
      + " V " + (this.svgHeight / 2) + " H " + (this.svgWidth / 2);
  }

  triangleCoordsCalc(): string {
    return "" + (this.svgWidth / 2) + "," + (this.svgHeight / 2) + " "
      + (this.svgWidth / 2) + "," + (this.svgHeight / 2 + this.svgWidth / 6) + " "
      + (this.svgWidth / 2 - this.svgWidth / 3) + "," + (this.svgHeight / 2);
  }


  private getAbsoluteOffsetFromXYCoords(x, y, r) {
    let relativeX = x * 100 / r;
    let relativeY = y * 100 / r;
    return {
      absoluteX: this.svgWidth / 2 + Math.round(relativeX),
      absoluteY: this.svgHeight / 2 - Math.round(relativeY)
    }
  }

  private getXYCoordsFromAbsoluteOffset(absoluteXOffset, absoluteYOffset, r) {
    return {
      x: Math.round(((absoluteXOffset - this.svgWidth / 2) * r / 100) * 1000) / 1000,
      y: Math.round(((this.svgHeight / 2 - absoluteYOffset) * r / 100) * 1000) / 1000
    }
  }


  addEntry(event: MouseEvent) {

    let belongs = (<Element>event.target).classList.contains("svg-element");
    if (belongs) {
      if (this.r != null) {
        let {x, y} = this.getXYCoordsFromAbsoluteOffset(event.offsetX, event.offsetY, this.r);
        console.log(JSON.parse(sessionStorage.getItem("statusObject")));
        this.addGraphEntry.emit({
          x: x,
          y: y,
          r: this.r,
          username: JSON.parse(sessionStorage.getItem('statusObject')).username,
          userPassword: JSON.parse(sessionStorage.getItem('statusObject')).password
        });

      } else {
        console.log("R undefined!");
        this.validationFail.emit(["R undefined!"]);
      }
    }
  }


  drawDots(r: number, entries: Entry[]) {
    this.points = [];
    this.r = r;
    console.log("R : " + this.r);
    console.log(entries);
    entries.forEach((value: Entry) => {
      let {absoluteX, absoluteY} = this.getAbsoluteOffsetFromXYCoords(value.x, value.y, this.r);
      let fill = this.isHit(value.x, value.y, this.r) ? this.HitColor : this.MissColor;
      this.points.push({x: value.x, y: value.y, cx: absoluteX, cy: absoluteY, fill: fill});
    });
  }

  clearPoints(newR: number) {
    this.points = [];
    this.r = newR;
  }

  drawDot(x: number, y: number, valid: boolean) {
    if (valid) {
      let {absoluteX, absoluteY} = this.getAbsoluteOffsetFromXYCoords(x, y, this.r);
      this.dotCx = absoluteX;
      this.dotCy = absoluteY;
      this.dotRadius = 3;
    } else {
      this.dotRadius = 0;
    }
  }

  isTopRight(x, y, r){
    return x >= 0 && y >= 0 && (x * x + y * y <= r*r/4);
  }

  isBottomLeft(x, y, r){
    return x <= 0 && y <= 0 && x >= -r && y >= - x / 2 - r / 2;
  }

  isTopLeft(x, y, r){
    return x <= 0 && x >= -r && y >= 0 && y <= r / 2;
  }

  isHit(x, y, r){
    console.log(this.isTopLeft(x, y, r));
    console.log(this.isTopRight(x, y, r));
    console.log(this.isBottomLeft(x, y, r));
    return this.isTopLeft(x, y, r) || this.isTopRight(x, y, r) || this.isBottomLeft(x, y, r);
  }

}
