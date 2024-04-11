import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component } from '@angular/core';

import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzUploadModule } from 'ng-zorro-antd/upload';

@Component({
  standalone: true,
  imports: [
    NzModalModule,
    NzFormModule,
    NzUploadModule,
    NzIconModule,
    ReactiveFormsModule,
    NzSelectModule
  ],
  selector: 'app-lista-desplegable',
  templateUrl: './lista-desplegable.component.html',
  styleUrls: ['./lista-desplegable.component.css']
})
export class ListaDesplegableComponent {
  validateForm: FormGroup<{
    note: FormControl<string | null>;
    gender: FormControl<'male' | 'male' | null>;
  }> = this.fb.group({
    note: this.fb.control<string | null>(null, Validators.required),
    gender: this.fb.control<'male' | 'male' | null>(null, Validators.required)
  });

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  genderChange(value: string): void {
    this.validateForm.controls.note.setValue(value === 'male' ? 'Hi, man!' : 'Hi, lady!');
  }

  constructor(private fb: FormBuilder) {}
}
