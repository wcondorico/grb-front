import { Component } from '@angular/core';
import { TableComponent } from "../../components/table/table.component";
import { NzLayoutModule } from 'ng-zorro-antd/layout';

@Component({
    selector: 'app-tags',
    standalone: true,
    templateUrl: './tags.component.html',
    styleUrl: './tags.component.scss',
    imports: [
        TableComponent,
        NzLayoutModule
    ]
})
export class TagsComponent {

}
