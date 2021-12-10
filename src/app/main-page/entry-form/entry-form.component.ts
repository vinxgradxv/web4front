import {Component} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EntryService} from "../../shared/entry-util/entry.service";
import {AuthService} from "../../shared/auth-util/auth.service";

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})
export class EntryFormComponent {

  yPlaceholder: string = "Y from -3 to 3...";
  submitButtonLabel: string = "Submit";
  resetButtonLabel: string = "Reset";

  constructor(private entryService: EntryService, private authService: AuthService) {
    // this.entryService.entryForm = this;
  }

  x_r_values: Array<string> = ["-4", "-3", "-2", "-1", "0", "1", "2", "3", "4"];

  entryForm: FormGroup = new FormGroup({
    "x": new FormControl(null, Validators.required),
    "y": new FormControl(null, Validators.required),
    "r": new FormControl(null, Validators.required)
  });

  onSubmit() {
    this.entryService.addEntry({
      x: this.entryForm.get("x").value,
      y: this.entryForm.get("y").value,
      r: this.entryForm.get("r").value,
      userName: (this.authService.getStatusObject != null) ? (this.authService.getStatusObject.name) : null
    })
  }

  // submit(): void {
  //   console.log(this.entryForm);
  // }

  inputFilter(event: KeyboardEvent) {
    let test = /[0-9.,\-+]/.test(event.key);
    if (!test && event.code != "Backspace" && event.code != "Delete"
      && event.code != "ArrowLeft" && event.code != "ArrowRight") {
      event.preventDefault();
    }
  }
}
