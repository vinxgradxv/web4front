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
  registerLabel: string = "register";
  submitButtonLabel: string = "Submit";
  submitted: boolean = false;

  signInForm: FormGroup = new FormGroup({
    "login": new FormControl(null, Validators.required),
    "password": new FormControl(null, Validators.required),
    "register": new FormControl(false)
  });
  loginMessage: string = "Login required!";
  passwordMessage: string = "Password required!";
  resultMessage: string = "Result message";
  result: boolean = false;

  constructor(private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) {

    // if (this.authService.getStatusObject && this.authService.getStatusObject.success) {
    //   this.router.navigate(['/']);
    // }
  }

  onSubmit(): void {



    // console.log(user);
    this.submitted = true;
    console.log(this.signInForm);
    // if (this.validateUser(user)) {
    if (this.signInForm.valid) {
      let user: User = {
        "login": this.signInForm.get("login").value,
        "password": this.signInForm.get("password").value
      }
      let so: Observable<StatusObject> = this.authService.logIn(user, this.signInForm.get("register").value);
      so.subscribe({
          next: (response: StatusObject) => {
            console.log(response)
            if (response.success) {
              const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
              this.router.navigate([returnUrl]);
            } else {
              if (this.signInForm.get("register").value == true) {
                this.resultMessage = "Registration failed: user already exists!";
              } else {
                this.resultMessage = "Auth failed: wrong password or no such user in db!"
              }
              this.result = true;
            }
          },
          error: (error: any) => {
            console.log(error)
          }
        }
      );
    } else {
      console.log("Validation failed");
    }
  }

  passwordErrors() {
    let errs = this.signInForm.get('password').errors;
    if (errs) return true;
    return false;
  }

  loginErrors() {
    let errs = this.signInForm.get('login').errors;
    if (errs) return true;
    return false;
  }

  touchField() {
    this.submitted = false;
    this.result = false;
  }

}
