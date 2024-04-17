import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { Tag } from '../../../core/interfaces/tags/tags';
import { TagFacade } from '../../../aplication/facade/tag.facade';

@Component({
  standalone: true,
  selector: 'add-tag-modal',
  templateUrl: './add-tag.modal.html',
  styleUrl: './add-tag.modal.scss',
  imports: [NzModalModule, NzFormModule, FormsModule, ReactiveFormsModule],
})
export class AddTagComponent implements OnInit{
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private readonly tagService: TagFacade = inject(TagFacade)

  @Input() isVisibleModalAddTag = false;
  @Output() isVisibleModalAddTagChange = new EventEmitter<boolean>();
  @Output() sendAddTag = new EventEmitter<void>();

  addTag!: Tag
  validateForm!: FormGroup<{
    name: FormControl<string | null>;
    color: FormControl<string | null>;
  }> 

  ngOnInit(): void {
      this.validateForm = this.formBuilder.group({
        name: ['', [Validators.required]],
        color: ['#', [Validators.required, this.validateHashtagNumber]]
      });
  }

  validateHashtagNumber(control: AbstractControl): {[key: string]: any} | null {
    const value = control.value;
    if (value[0] !== '#' || value.length === 1 || !(/^\d+$/.test(value.substring(1)))) {
      return { 'invalidHashtagNumber': true };
    }
    return null;
  }

  handleOk() {
    if(this.validateForm.valid){
      this.addTag = {
        name: this.validateForm.value.name!,
        color: this.validateForm.value.color!
      };
      console.log(this.addTag);
      this.tagService.addTag(this.addTag).subscribe({
        next: (response) => {
          this.sendAddTag.emit();
          this.isVisibleModalAddTag = false;
          this.isVisibleModalAddTagChange.emit(this.isVisibleModalAddTag);
        },
        error: (messageError) => console.log(messageError),
      });
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  handleCancel(): void {

    this.isVisibleModalAddTag = false;
    this.isVisibleModalAddTagChange.emit(this.isVisibleModalAddTag);
  }
}
