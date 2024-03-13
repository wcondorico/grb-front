import { Component } from '@angular/core';
import { NzButtonComponent, NzButtonSize } from "ng-zorro-antd/button";
import { NzIconDirective } from "ng-zorro-antd/icon";
import { NzButtonModule } from 'ng-zorro-antd/button';
import { MenuComponent } from "../../../components/menu/menu.component";
import { NzAvatarModule } from 'ng-zorro-antd/avatar';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    NzButtonComponent,
    NzIconDirective,
    NzButtonModule,
    MenuComponent,
    NzAvatarModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  size: NzButtonSize = 'large';
}
