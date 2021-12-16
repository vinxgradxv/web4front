import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  userName: string;
  logOutLabel: string = "Log out";

  constructor(
    private router: Router,
    private authenticationService: AuthService
  ) {
    this.userName = authenticationService.getStatusObject.name;
  }

  logout() {
    this.authenticationService.logOut();
    this.router.navigate(['/login']);
  }

}
