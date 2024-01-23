import { Component } from '@angular/core';
import { NzIconDirective } from "ng-zorro-antd/icon";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    NzIconDirective,
    RouterLink
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

}
