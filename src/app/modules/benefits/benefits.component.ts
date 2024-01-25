import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from "@angular/router";
import { NzButtonComponent } from "ng-zorro-antd/button";
import { NzIconDirective } from "ng-zorro-antd/icon";
import { HeaderComponent } from "./core/layouts/header/header.component";
import { FooterComponent } from "./core/layouts/footer/footer.component";


@Component({
  selector: 'app-benefits',
  standalone: true,
  imports: [
    RouterOutlet,
    NzButtonComponent,
    RouterLink,
    NzIconDirective,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './benefits.component.html',
  styleUrl: './benefits.component.scss'
})
export class BenefitsComponent {
}
