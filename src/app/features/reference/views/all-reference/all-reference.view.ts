import { Component } from '@angular/core';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonComponent } from "ng-zorro-antd/button";
import { NzIconDirective } from "ng-zorro-antd/icon";
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { TableComponent } from "../../components/table/table.component";

@Component({
    selector: 'app-all-reference',
    standalone: true,
    templateUrl: './all-reference.view.html',
    styleUrl: './all-reference.view.scss',
    imports: [
        NzInputModule,
        NzButtonComponent,
        NzIconDirective,
        NzIconModule,
        NzLayoutModule,
        TableComponent
    ]
})
export class HomeView {

}
