import { Component } from '@angular/core';

import { NzButtonComponent, NzButtonSize } from "ng-zorro-antd/button";
import { NzIconDirective } from "ng-zorro-antd/icon";
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';

import { MenuComponent } from "../../../components/menu/menu.component";
import { AddReferenceModalComponent } from '../../../components/modal/add-reference/add-reference.modal';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss',
    imports: [
        NzButtonComponent,
        NzIconDirective,
        NzButtonModule,
        MenuComponent,
        NzAvatarModule,
        NzIconModule,
        NzMenuModule,
        NzModalModule,
        AddReferenceModalComponent,
        NzSelectModule
    ]
})
export class SidebarComponent {
  size: NzButtonSize = 'large';
  theme = true
  showListUser= false
  isVisibleModalReference = false;

  changeShowListUser(){
    this.showListUser = !this.showListUser
  }

  changeIsVisibleModalReference(){
    this.isVisibleModalReference = true
  }
  
}
