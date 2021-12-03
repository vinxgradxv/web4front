import {Component, ViewChild} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {

  loginPlaceholder: string = "Login";
  passwordPlaceholder: string = "Password";
  registerLabel: string = "register";
  submitButtonLabel: string = "Submit";

  registration: boolean = false;

  signInForm: FormGroup = new FormGroup({
    "login": new FormControl(null, Validators.required),
    "password": new FormControl(null, Validators.required),
    "register": new FormControl(false)
  });

  constructor() {
  }


  onSubmit(): void {
    console.log(this.signInForm);
  }

  onc(form: NgForm) {
    console.log(form.valid)
  }

  changeRegistrationStatus(): void {
    this.registration = !this.registration;
  }
}
