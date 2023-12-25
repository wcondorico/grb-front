import { Component } from '@angular/core';
import { NzButtonComponent } from "ng-zorro-antd/button";
import { NzInputDirective, NzInputGroupComponent } from "ng-zorro-antd/input";
import { NzIconDirective } from "ng-zorro-antd/icon";

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

}
