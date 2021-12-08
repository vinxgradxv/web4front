import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../shared/auth-service/auth.service";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  constructor(
    private router: Router,
    private authenticationService: AuthService
  ) {
  }

  logout() {
    this.authenticationService.logOut();
    this.router.navigate(['/login']);
  }

}
