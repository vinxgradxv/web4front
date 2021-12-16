import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EntryService} from "../../shared/services/entry.service";
import {AuthService} from "../../shared/services/auth.service";
import {BehaviorSubject} from "rxjs";
import {InteractionService} from "../../shared/services/interaction.service";

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})
export class EntryFormComponent implements OnInit {

  yPlaceholder: string = "Y from -3 to 3...";
  submitButtonLabel: string = "Submit";
  resetButtonLabel: string = "Reset";

  // constructor(private entryService: EntryService) {
  //   this.entryService.form = this;
  // }

  constructor(private interactionService: InteractionService) {
    this.interactionService.form = this;
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

      this.interactionService.addEntry({
        x: this.entryForm.get("x").value,
        y: this.entryForm.get("y").value,
        r: this.entryForm.get("r").value,
        userName: JSON.parse(localStorage.getItem('statusObject')).name
      });

    } else {
      console.log("Invalid form");
      let messages = [
        (this.entryForm.get("x").invalid) ? "Invalid X (X should be in [-4, 4] and not null)" : null,
        (this.entryForm.get("y").invalid) ? "Invalid Y (Y should be in [-3, 3] and not null)" : null,
        (this.entryForm.get("r").invalid) ? "Invalid R (R should be > 0 and not null)" : null
      ].filter(value => value != null);
      this.interactionService.messages.setValidationMessages(messages);
    }
  }

  // xValidate(x: number) {
  //   return true;
  // }

  // yValidate(y: number) {
  //   return (y<=3) && (y>=-3);
  // }

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
      this.interactionService.graph.drawDots(this.entryForm.get("r").value);
      this.interactionService.messages.clearMessages();
    } else {
      console.log("Invalid R! Graph cannot be redrawn");
      this.interactionService.messages.setValidationMessages(["Invalid R! Graph cannot be redrawn"]);
    }
  }

  clearAll() {
    this.interactionService.clearAllEntries();
  }

  rMatches(item: string) {
    return this.entryForm.get('r').value == parseFloat(item);
  }

  clearMessages() {
    this.interactionService.messages.clearMessages();
  }
}
