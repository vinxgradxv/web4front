import {Component, ViewChild} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {AuthService} from "../../shared/auth-service/auth.service";
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

  signInForm: FormGroup = new FormGroup({
    "login": new FormControl(null, Validators.required),
    "password": new FormControl(null, Validators.required),
    "register": new FormControl(false)
  });

  constructor(private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) {

    // if (this.authService.getStatusObject && this.authService.getStatusObject.success) {
    //   this.router.navigate(['/']);
    // }
  }

  onSubmit(): void {

    let user: User = {
      "login": this.signInForm.get("login").value,
      "password": this.signInForm.get("password").value
    }

    console.log(user);

    if (this.validateUser(user)) {
      let so: Observable<StatusObject> = this.authService.logIn(user, this.signInForm.get("register").value);
      so.subscribe({
          next: (response: StatusObject) => {
            console.log(response)
            const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
            this.router.navigate([returnUrl]);
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

  validateUser(user: User): boolean {
    return user.login !== "" && user.password !== "";
  }

}
