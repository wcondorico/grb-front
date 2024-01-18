import { Component } from '@angular/core';
import {NzButtonComponent, NzButtonSize} from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-benefits',
  standalone: true,
  imports: [
    NzButtonComponent,
    NzIconModule,
    RouterLink
  ],
  templateUrl: './benefits.view.html',
  styleUrl: './benefits.view.scss'
})

export class BenefitsView {
  size: NzButtonSize = 'large';
}

