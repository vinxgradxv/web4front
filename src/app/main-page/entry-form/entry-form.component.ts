import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EntryService} from "../../shared/entry-util/entry.service";
import {AuthService} from "../../shared/auth-util/auth.service";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})
export class EntryFormComponent implements OnInit {

  yPlaceholder: string = "Y from -3 to 3...";
  submitButtonLabel: string = "Submit";
  resetButtonLabel: string = "Reset";

  constructor(private entryService: EntryService) {
    this.entryService.form = this;
  }

  ngOnInit() {
  }

  x_r_values: Array<string> = ["-4", "-3", "-2", "-1", "0", "1", "2", "3", "4"];

  entryForm: FormGroup = new FormGroup({
    "x": new FormControl(null,
      [Validators.required]),
    "y": new FormControl(null,
      [Validators.required, Validators.pattern(/^[+-]?[0-9]+\.?[0-9]*$/),
        Validators.min(-3), Validators.max(3)]),
    "r": new FormControl(null,
      [Validators.required, Validators.min(1)])
  });

  onSubmit() {

    console.log(this.entryForm);

    if (this.entryForm.valid) {

      this.entryService.addEntry({
        x: this.entryForm.get("x").value,
        y: this.entryForm.get("y").value,
        r: this.entryForm.get("r").value,
        userName: JSON.parse(localStorage.getItem('statusObject')).name
      });
    } else {
      console.log("Invalid form");
    }
  }


  xValidate(x: number) {
    return true;
  }

  yValidate(y: number) {
    return (y<=3) && (y>=-3);
  }

  rValidate(r: number) {
    return r>0;
  }

  inputFilter(event: KeyboardEvent) {
    let test = /[0-9.,\-+]/.test(event.key);
    if (!test && event.code != "Backspace" && event.code != "Delete"
      && event.code != "ArrowLeft" && event.code != "ArrowRight") {
      event.preventDefault();
    }
  }

  rChanged() {
    if (this.rValidate(this.entryForm.get("r").value)) {
      //this.entryService.graph.redrawDots(this.entryForm.get("r").value);
      this.entryService.graph.drawDots(this.entryForm.get("r").value);
    } else {console.log("Invalid R! Graph cannot be redrawn")}
  }

  clearAll() {
    this.entryService.clearAllEntries();
  }

  rMatches(item: string) {
    return this.entryForm.get('r').value == parseFloat(item);
  }
}
