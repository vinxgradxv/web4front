import {Component, OnInit} from '@angular/core';
import {StatusObject} from "./shared/data/status-object";
import {Router} from "@angular/router";
import {AuthService} from "./shared/services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser: StatusObject;

  constructor(
    private router: Router,
    private authenticationService: AuthService
  ) {
    this.authenticationService.getStatusObjectObservable.subscribe(x => this.currentUser = x);
  }

}
