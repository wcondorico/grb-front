import { Component } from '@angular/core';
import { TableComponent } from "../../components/table/table.component";
import { NzLayoutModule } from 'ng-zorro-antd/layout';

@Component({
    selector: 'app-authors',
    standalone: true,
    templateUrl: './authors.component.html',
    styleUrl: './authors.component.scss',
    imports: [
        TableComponent,
        NzLayoutModule
    ]
})
export class AuthorsComponent {

}
