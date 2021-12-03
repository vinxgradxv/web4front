import {Component, ViewChild} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {LoginService} from "../../shared/login-service/login.service";
import {User} from "../../shared/data/user";
import {Observable} from "rxjs";
import {StatusObject} from "../../shared/data/status-object";

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

    let user: User = {
      "login": this.signInForm.get("login").value,
      "password": this.signInForm.get("login").value
    }

    console.log(user);

    if (this.validateUser(user)) {
      let so: Observable<StatusObject> = this.loginService.sendSignInRequest(user, this.registration);
      so.subscribe((response: StatusObject) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      )
    } else {
      console.log("Validation failed");
    }
  }

  validateUser(user: User): boolean {
    return user.login !== "" && user.password !== "";
  }

}
