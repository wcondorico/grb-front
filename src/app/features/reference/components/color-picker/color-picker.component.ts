import { Component } from '@angular/core';
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
  color = "blue"

  action(color: string){
    console.log(color);
  }
}
