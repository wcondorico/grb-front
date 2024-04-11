import { Component } from '@angular/core';
import { SidebarComponent } from "./core/layouts/sidebar/sidebar.component";
import { RouterOutlet } from "@angular/router";
import { AllReference } from "./views/all-reference/all-reference.view";
import { AuthorsComponent } from './views/authors/authors.component';
import { TagsComponent } from './views/tags/tags.component';
@Component({
  selector: 'app-reference',
  standalone: true,
  imports: [
    SidebarComponent,
    RouterOutlet,
    AllReference,
    AuthorsComponent,
    TagsComponent
  ],
  templateUrl: './reference.component.html',
  styleUrl: './reference.component.scss'
})
export class ReferenceComponent {

}
