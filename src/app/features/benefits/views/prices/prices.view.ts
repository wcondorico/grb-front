import { Component } from '@angular/core';
import { NzCardComponent } from "ng-zorro-antd/card";
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CurrencyPipe } from "@angular/common";

@Component({
  selector: 'app-prices',
  standalone: true,
  imports: [
    NzCardComponent,
    NzIconModule,
    CurrencyPipe
  ],
  templateUrl: './prices.view.html',
  styleUrl: './prices.view.scss'
})
export class PricesView {

}
