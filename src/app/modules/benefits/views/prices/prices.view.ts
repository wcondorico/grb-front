import { Component, LOCALE_ID } from '@angular/core';
import { NzCardComponent } from "ng-zorro-antd/card";
import { NzIconModule } from 'ng-zorro-antd/icon';
import {CurrencyPipe, registerLocaleData} from "@angular/common";
import localeEsPE  from '@angular/common/locales/es-PE';

registerLocaleData(localeEsPE, 'es-PE');


@Component({
  selector: 'app-prices',
  standalone: true,
  imports: [
    NzCardComponent,
    NzIconModule,
    CurrencyPipe
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-PE' }
  ],
  templateUrl: './prices.view.html',
  styleUrl: './prices.view.scss'
})
export class PricesView {

}
