import { Component } from '@angular/core';
import { SidebarComponent } from "./core/layouts/sidebar/sidebar.component";
import { RouterOutlet } from "@angular/router";
import { HomeView } from "./views/home/home.view";

@Component({
  selector: 'app-reference',
  standalone: true,
  imports: [
    SidebarComponent,
    RouterOutlet,
    HomeView
  ],
  templateUrl: './reference.component.html',
  styleUrl: './reference.component.scss'
})
export class ReferenceComponent {

}
