import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ColorPickerModule } from 'ngx-color-picker';

@Component({
  selector: 'color-picker-component',
  standalone: true,
  imports: [
    ColorPickerModule
  ],
  templateUrl: './color-picker.component.html',
  styleUrl: './color-picker.component.scss',
})
export class ColorPickerComponent { 
  @Input() backGround = "#96a0c4";
  @Output() sendColor = new EventEmitter<string>();
  

  setColor(color: string){
    this.backGround = color;
    this.sendColor.emit(this.backGround)
  }
}
