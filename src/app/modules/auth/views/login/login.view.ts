import { Component } from '@angular/core';
import { NzButtonComponent } from "ng-zorro-antd/button";
import { NzInputDirective, NzInputGroupComponent } from "ng-zorro-antd/input";
import { NzIconDirective, NzIconService } from "ng-zorro-antd/icon";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NzButtonComponent,
    NzInputDirective,
    NzIconDirective,
    NzInputGroupComponent
  ],
  templateUrl: './login.view.html',
  styleUrl: './login.view.scss'
})
export class LoginView {
  constructor(private iconService: NzIconService) {
    this.iconService.fetchFromIconfont({
      scriptUrl: 'https://at.alicdn.com/t/font_8d5l8fzk5b87iudi.js'
    });
  }
}
