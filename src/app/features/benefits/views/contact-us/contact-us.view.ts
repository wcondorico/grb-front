import { Component } from '@angular/core';
import { NzCardComponent, NzCardMetaComponent, NzCardModule } from "ng-zorro-antd/card";
import { NzAvatarComponent } from "ng-zorro-antd/avatar";
import { NzIconModule} from "ng-zorro-antd/icon";

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [
    NzCardComponent,
    NzCardMetaComponent,
    NzAvatarComponent,
    NzCardModule,
    NzIconModule
  ],
  templateUrl: './contact-us.view.html',
  styleUrl: './contact-us.view.scss'
})
export class ContactUsView {

}
