import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {NzButtonComponent, NzButtonSize} from "ng-zorro-antd/button";
import {NzIconDirective} from "ng-zorro-antd/icon";

@Component({
  selector: 'app-benefits',
  standalone: true,
  imports: [
    RouterOutlet,
    NzButtonComponent,
    RouterLink,
    NzIconDirective
  ],
  templateUrl: './benefits.component.html',
  styleUrl: './benefits.component.scss'
})
export class BenefitsComponent {
  size: NzButtonSize = 'large';
}
