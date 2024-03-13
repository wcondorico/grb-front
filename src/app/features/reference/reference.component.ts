import { Component } from '@angular/core';
import { SidebarComponent } from "./core/layouts/sidebar/sidebar.component";
import { MainComponent } from "./core/layouts/main/main.component";

@Component({
    selector: 'app-reference',
    standalone: true,
    templateUrl: './reference.component.html',
    styleUrl: './reference.component.scss',
    imports: [SidebarComponent, MainComponent]
})
export class ReferenceComponent {

}
