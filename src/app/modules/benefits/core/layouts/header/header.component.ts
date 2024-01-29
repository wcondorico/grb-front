import { Component } from '@angular/core';
import { NzButtonComponent, NzButtonSize } from "ng-zorro-antd/button";
import { RouterLink } from "@angular/router";
import { NzIconModule } from 'ng-zorro-antd/icon';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NzButtonComponent,
    RouterLink,
    NzIconModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  size: NzButtonSize = 'large';

  closeNav(){

  }

}
