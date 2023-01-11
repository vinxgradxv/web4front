import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  username: string;
  logOutLabel: string = "Log out";

  constructor(
    private router: Router,
    private authenticationService: AuthService
  ) {
    console.log(JSON.parse(sessionStorage.getItem('statusObject')).login);
    this.username = JSON.parse(sessionStorage.getItem('statusObject')).login;
  }

  logout() {
    this.authenticationService.logOut();
    this.router.navigate(['/login']);
  }

}
