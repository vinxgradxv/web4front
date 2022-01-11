import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RawEntry} from "../../shared/data/raw-entry";

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})
export class EntryFormComponent implements OnInit {

  yPlaceholder: string = "Y from -3 to 3...";
  submitButtonLabel: string = "Submit";
  resetButtonLabel: string = "Reset";

  @Output() addEntry = new EventEmitter<RawEntry>();
  @Output() clearEntries = new EventEmitter<void>();
  @Output() clearMessageBlock = new EventEmitter<void>();
  @Output() validationFail = new EventEmitter<string[]>();
  @Output() rChange = new EventEmitter<number>();
  @Output() drawDot = new EventEmitter<any>();


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

      this.addEntry.emit({
        x: this.entryForm.get("x").value,
        y: this.entryForm.get("y").value,
        r: this.entryForm.get("r").value,
        userName: JSON.parse(localStorage.getItem('statusObject')).name
      });

    } else {
      console.log("Invalid form");
      let messages = [
        (this.entryForm.get("x").invalid) ? "Invalid X! (X should be in [-4, 4] and not null)" : null,
        (this.entryForm.get("y").invalid) ? "Invalid Y! (Y should be in [-3, 3] and not null)" : null,
        (this.entryForm.get("r").invalid) ? "Invalid R! (R should be > 0 and not null)" : null
      ].filter(value => value != null);
      this.validationFail.emit(messages);
    }

  }

  rValidate(r: number) {
    return r > 0;
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
      this.rChange.emit(this.entryForm.get("r").value);
    } else {
      console.log("Invalid R! Graph cannot be redrawn");
      this.validationFail.emit(["Invalid R! Graph cannot be redrawn"]);
    }
  }

  clearAll() {
    this.clearEntries.emit();
  }

  rMatches(item: string) {
    return this.entryForm.get('r').value == parseFloat(item);
  }

  clearMessages() {
    this.clearMessageBlock.emit();
  }

  drawDotAndClearMsg() {
    this.clearMessages();
    this.drawDot.emit(
      {
        x: this.entryForm.get("x").value,
        y: this.entryForm.get("y").value,
        valid: this.entryForm.valid
      }
    );
    // this.interactionService.graph.drawDot(this.entryForm.get("x").value, this.entryForm.get("y").value, this.entryForm.valid);
  }

}
