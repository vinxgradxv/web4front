import {Component} from '@angular/core';
import {AuthService} from "../../shared/auth-util/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  name: string = "Sofya Inglikova";
  group: string = "P3233";
  varNum: number = 3356;
}
