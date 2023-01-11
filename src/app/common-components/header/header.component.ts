import {Component} from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  name: string = "Gleb Vinogradov";
  group: string = "P32111";
  varNum: number = 11118;
}
