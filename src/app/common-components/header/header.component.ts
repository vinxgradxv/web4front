import {Component} from '@angular/core';

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
