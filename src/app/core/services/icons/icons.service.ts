import { inject, Injectable } from '@angular/core';
import { NzIconService } from "ng-zorro-antd/icon";
import { customIcons } from "./icons.constant";

@Injectable({
  providedIn: 'root'
})
export class IconsService {

  private iconService = inject(NzIconService);

  addIcons(): void {
    customIcons.forEach(value => {
      this.iconService.addIconLiteral(value.name, value.icon);
    });
  }
}
