import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { NzModalModule, StyleObjectLike } from 'ng-zorro-antd/modal';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ReactiveFormsModule } from '@angular/forms';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';

@Component({
  standalone: true,
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  imports: [NzModalModule, NzFormModule, ReactiveFormsModule, NzUploadModule],
})
export class ModalComponent {
  @Input() isVisibleMiddle = false;
  @Output() isVisibleMiddleChange = new EventEmitter<boolean>();
  private readonly fb: NonNullableFormBuilder = inject(NonNullableFormBuilder);
  private readonly msg: NzMessageService = inject(NzMessageService);

  styleBodyModal: StyleObjectLike = {
    backgroundColor: 'white',
  };

  validateForm: FormGroup<{
    title: FormControl<string>;
    age: FormControl<string>;
    author: FormControl<string>;
  }> = this.fb.group({
    title: ['', [Validators.required]],
    age: ['', [Validators.required]],
    author: ['', [Validators.required]],
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

  handleChange({ file, fileList }: NzUploadChangeParam): void {
    const status = file.status;
    if (status !== 'uploading') {
      console.log(file, fileList);
    }
    if (status === 'done') {
      this.msg.success(`${file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      this.msg.error(`${file.name} file upload failed.`);
    }
  }
}
