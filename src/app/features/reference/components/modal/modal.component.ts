import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NzModalModule } from 'ng-zorro-antd/modal';

@Component({
  standalone: true,
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  imports: [NzModalModule]
})
export class ModalComponent {
  @Input() isVisibleMiddle = false;
  @Output() isVisibleMiddleChange = new EventEmitter<boolean>();

  styleModal: object = {
    borderRadius: "10px",
    width: "1020px",
    height: "400px"
  }

  handleOkMiddle(): void {
    console.log('click ok');
    this.isVisibleMiddle = false;
    this.isVisibleMiddleChange.emit(this.isVisibleMiddle)
  }

  handleCancelMiddle(): void {
    this.isVisibleMiddle = false;
    this.isVisibleMiddleChange.emit(this.isVisibleMiddle)
  }
}
