import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule, StyleObjectLike } from 'ng-zorro-antd/modal';
import { NzUploadModule } from 'ng-zorro-antd/upload';

@Component({
  standalone: true,
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  imports: [
    NzModalModule,
    NzFormModule,
    ReactiveFormsModule,
    NzUploadModule,
    NzIconModule
  ],
})
export class ModalComponent {
  @Input() isVisibleMiddle = false;
  @Output() isVisibleMiddleChange = new EventEmitter<boolean>();
  private readonly fb: NonNullableFormBuilder = inject(NonNullableFormBuilder);

  styleBodyModal: StyleObjectLike = {
    backgroundColor: 'white',
  };

  validateForm: FormGroup<{
    title: FormControl<string>;
    age: FormControl<string>;
    author: FormControl<string>;
    reference: FormControl<string>;
  }> = this.fb.group({
    title: ['', [Validators.required]],
    age: ['', [Validators.required]],
    author: ['', [Validators.required]],
    reference: ['', [Validators.required]],
  });

  handleOkMiddle(): void {
    console.log('click ok');

    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      this.isVisibleMiddle = false;
      this.isVisibleMiddleChange.emit(this.isVisibleMiddle);
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  handleCancelMiddle(): void {
    this.isVisibleMiddle = false;
    this.isVisibleMiddleChange.emit(this.isVisibleMiddle);
  }

}
