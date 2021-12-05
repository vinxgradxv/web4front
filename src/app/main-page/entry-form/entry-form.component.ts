import {Component} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})
export class EntryFormComponent {

  yPlaceholder: string = "Y from -3 to 3...";
  submitButtonLabel: string = "Submit";
  resetButtonLabel: string = "Reset";

  x_r_values: Array<string> = ["-4", "-3", "-2", "-1", "0", "1", "2", "3", "4"];

  entryForm: FormGroup = new FormGroup({

  });

  onSubmit() {

  }
}
