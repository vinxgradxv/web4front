import {Component, ViewChild} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {LoginService} from "../../shared/login-service/login.service";

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

  constructor(private loginService: LoginService) {
  }


  onSubmit(): void {
    //console.log(this.signInForm);
    //this.loginService.sout();
  }

  onc(form: NgForm) {
    console.log(form.valid)
  }

  changeRegistrationStatus(): void {
    this.registration = !this.registration;
  }

  checkErrors(controlName: string): boolean {

    let control: AbstractControl = this.signInForm.get(controlName);
    if (control != null && control.errors != null) {
      return true;
    }
    return false;
  }
}
