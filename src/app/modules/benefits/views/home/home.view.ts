import { Component } from '@angular/core';
import { NzButtonComponent, NzButtonSize } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NzButtonComponent,
    NzIconModule,
    RouterLink
  ],
  templateUrl: './home.view.html',
  styleUrl: './home.view.scss'
})

export class HomeView {

}

