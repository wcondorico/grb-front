import { Component, inject, Renderer2 } from '@angular/core';
import { NzButtonComponent, NzButtonSize } from "ng-zorro-antd/button";
import { RouterLink } from "@angular/router";
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NgClass, NgStyle } from "@angular/common";


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NzButtonComponent,
    RouterLink,
    NzIconModule,
    NgClass,
    NgStyle
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {


  private readonly renderer = inject(Renderer2)

  size: NzButtonSize = 'large';
  showNav = false


  changeFlag(): void {
    this.showNav ? this.isNotVisible() :this.isVisible() ;
  }

  isNotVisible() {
    this.showNav = false;
    this.renderer.removeStyle(document.body, 'overflow');
  }

  isVisible(){
    this.showNav = true;
    this.renderer.setStyle(document.body, 'overflow', 'hidden');
  }

}
