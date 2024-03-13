import { Component } from '@angular/core';
import { TableComponent } from "../../components/table/table.component";
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonComponent } from "ng-zorro-antd/button";
import { NzIconDirective } from "ng-zorro-antd/icon";
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.view.html',
    styleUrl: './home.view.scss',
  imports: [
    TableComponent,
    NzInputModule,
    NzButtonComponent,
    NzIconDirective,
    NzIconModule
  ]
})
export class HomeView {

}
