import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { NzButtonComponent } from "ng-zorro-antd/button";
import { NzIconDirective } from "ng-zorro-antd/icon";
import { NzMenuDirective, NzMenuItemComponent, NzSubMenuComponent } from "ng-zorro-antd/menu";
import { NzTooltipDirective } from "ng-zorro-antd/tooltip";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  standalone: true,
  imports: [
    NzButtonComponent,
    NzIconDirective,
    NzMenuDirective,
    NzMenuItemComponent,
    NzTooltipDirective,
    NzSubMenuComponent,
    RouterLink
  ]
})
export class MenuComponent {
  
}
