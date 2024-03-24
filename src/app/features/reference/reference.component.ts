import { Component } from '@angular/core';
import { SidebarComponent } from "./core/layouts/sidebar/sidebar.component";
import { RouterOutlet } from "@angular/router";
import { HomeView } from "./views/all-reference/all-reference.view";
import { AuthorsComponent } from './views/Authors/authors.component';
import { TagsComponent } from './views/Tags/tags.component';
@Component({
  selector: 'app-reference',
  standalone: true,
  imports: [
    SidebarComponent,
    RouterOutlet,
    HomeView,
    AuthorsComponent,
    TagsComponent
  ],
  templateUrl: './reference.component.html',
  styleUrl: './reference.component.scss'
})
export class ReferenceComponent {

}
