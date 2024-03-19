import { Component } from '@angular/core';
import { NzButtonComponent, NzButtonSize } from "ng-zorro-antd/button";
import { NzIconDirective } from "ng-zorro-antd/icon";
import { NzButtonModule } from 'ng-zorro-antd/button';
import { MenuComponent } from "../../../components/menu/menu.component";
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    NzButtonComponent,
    NzIconDirective,
    NzButtonModule,
    MenuComponent,
    NzAvatarModule,
    NzIconModule,
    NzMenuModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  size: NzButtonSize = 'large';
  theme = true
  showListUser= false

  changeShowListUser(){
    this.showListUser = !this.showListUser
  }


}
