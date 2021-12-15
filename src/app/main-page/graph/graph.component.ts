import {Component, OnInit} from "@angular/core";
import {EntryService} from "../../shared/entry-util/entry.service";
import {Entry} from "../../shared/data/entry";
import {Point} from "../../shared/data/point";
import {StatusObject} from "../../shared/data/status-object";

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

  curHitColor: string = "#34f5e5";
  curMissColor: string = "#f6f30a";
  otherColor: string = "#d84aee";

  constructor(private entryService: EntryService) {
    this.entryService.graph = this;
  }

  ngOnInit() {
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

  // drawPoints(values: Entry[], r: number): void {
  //   this.points = [];
  //   this.r = r;
  //   // console.log(r);
  //   values.forEach((value: Entry) => {
  //     let {absoluteX, absoluteY} = this.getAbsoluteOffsetFromXYCoords(value.x, value.y, this.r);
  //     let fill = this.calcPointColor(value.r, this.r, value.hit);
  //     // this.points.push({x: value.x, y: value.y, r: value.r, hit: value.hit, cx: absoluteX, cy: absoluteY, fill: fill});
  //     this.points.push({x: value.x, y: value.y, cx: absoluteX, cy: absoluteY, fill: fill});
  //   });
  //   // console.log(this.points);
  // }

  calcPointColor(pointR: number, currR: number, hit: boolean) {
    return (pointR != currR) ? this.otherColor : ((hit) ? this.curHitColor : this.curMissColor);
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

  getDotCoords(event: MouseEvent) {

    // console.log(event.offsetX, event.offsetY);
    //     // console.log(event.target);
    //     // console.log(event);
    let belongs = (<Element>event.target).classList.contains("svg-element");
    if (belongs) {
      if (this.r != null) {
        let {x, y} = this.getXYCoordsFromAbsoluteOffset(event.offsetX, event.offsetY, this.r);
        this.entryService.addEntry({
          x: x,
          y: y,
          r: this.r,
          userName: (<StatusObject>JSON.parse(localStorage.getItem("statusObject"))).name
        });
      } else {
        console.log("R undefined!")
      }
    }
  }


  drawDots(r: number) {
    this.points = [];
    this.r = r;
    console.log("R : "+ this.r);
    this.entryService.entries.value.forEach((value: Entry) => {
      let {absoluteX, absoluteY} = this.getAbsoluteOffsetFromXYCoords(value.x, value.y, this.r);
      let fill = this.calcPointColor(value.r, this.r, value.hit);
      // this.points.push({x: value.x, y: value.y, r: value.r, hit: value.hit, cx: absoluteX, cy: absoluteY, fill: fill});
      this.points.push({x: value.x, y: value.y, cx: absoluteX, cy: absoluteY, fill: fill});
    });
  }
    // this.points.forEach(point => {
    //   let {absoluteX, absoluteY} = this.getAbsoluteOffsetFromXYCoords(point.x, point.y, this.r);
    //   point.cx = absoluteX;
    //   point.cy = absoluteY;
    //   point.fill = this.calcPointColor(point.r, this.r, point.hit);
    // });

  clearPoints() {
    this.points = [];
    this.r = this.entryService.form.entryForm.get("r").value;
    //console.log("r " + this.r);
  }


}
