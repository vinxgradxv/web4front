import {Component, ViewChild} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";
import {User} from "../../shared/data/user";
import {Observable} from "rxjs";
import {StatusObject} from "../../shared/data/status-object";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {

  loginPlaceholder: string = "Login";
  passwordPlaceholder: string = "Password";
  signUpButtonLabel: string = "Sign Up";
  logInButtonLabel: string = "Log In";
  submitted: boolean = false;
  requestFail: boolean = false;

  signInForm: FormGroup = new FormGroup({
    "login": new FormControl(null, Validators.required),
    "password": new FormControl(null, Validators.compose([Validators.required, Validators.minLength(5)])),
  });
  resultMessage: string = "Result message";
  result: boolean = false;
  validationMessage: string = "Login and password required!";

  constructor(private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  onLogInSubmit(): void {
    this.onSubmit(false);
  }

  onSignUpSubmit(): void {
    this.onSubmit(true);
  }

  onSubmit(register: boolean): void {
    this.requestFail = false;
    this.submitted = true;
    console.log(this.signInForm);
    if (this.signInForm.valid) {
      let user: User = {
        "login": this.signInForm.get("login").value,
        "password": this.signInForm.get("password").value
      }
      let so: Observable<StatusObject> = this.authService.logIn(user, register);
      so.subscribe({
          next: (response: StatusObject) => {
            console.log("все хорошо!!!");
            console.log(response);
            this.result = true;
            if (response.status) {
              this.router.navigate(["/main"]);
            }
          },
          error: (error: any) => {
            console.log("ошибка!!!");
              if (register == true) {
                this.validationMessage = "Registration failed: user already exists!";
                this.requestFail = true;
              } else {
                this.validationMessage = "Auth failed: wrong password or no such user in db!";
                this.requestFail = true;
              }
          }
        }
      );
    } else {
      console.log("Validation failed");
    }
  }

  passwordErrors() {
    let errs = this.signInForm.get('password');
    if (errs.hasError("minlength")){
      this.validationMessage = "password minimum length is 5!"
      return true;
    }
    if (errs.hasError("required")){
      this.validationMessage = "Login and password required!"
      return true;
    }
    return false;
  }

  loginErrors() {
    let errs = this.signInForm.get('login').errors;
    if (errs) {
      this.validationMessage = "Login and password required!";
      return true;
    }
    return false;
  }

  touchField() {
    this.submitted = false;
    this.result = false;
  }
}
