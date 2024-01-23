import { Component } from '@angular/core';
import {NzButtonComponent, NzButtonSize} from "ng-zorro-antd/button";
import {RouterLink} from "@angular/router";
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NzButtonComponent,
    RouterLink,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  size: NzButtonSize = 'large';
}
