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
import { ColorPickerComponent } from "../../color-picker/color-picker.component";

@Component({
    standalone: true,
    selector: 'update-tag-modal',
    templateUrl: './update-tag.modal.html',
    styleUrl: './update-tag.modal.scss',
    imports: [NzModalModule, NzFormModule, FormsModule, ReactiveFormsModule, ColorPickerComponent]
})
export class UpdateTagComponent implements OnInit{
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private readonly tagService: TagFacade = inject(TagFacade)

  @Input() isVisibleModalUpdateTag = false;
  @Output() isVisibleModalUpdateTagChange = new EventEmitter<boolean>();
  @Output() sendUpdateTag = new EventEmitter<void>();
  @Input() updateTagData!: Tag

  validateForm!: FormGroup<{
    name: FormControl<string | null>;
    color: FormControl<string | null>;
  }> 

  ngOnInit(): void {
     this.validateForm = this.formBuilder.group({
      name: [this.updateTagData.name, [Validators.required]],
      color: [this.updateTagData.color, [Validators.required, this.validateHashtag]]
    }); 
  }

  validateHashtag(control: AbstractControl): {[key: string]: any} | null {
    const value = control.value;
    if (value[0] !== '#' || value.length === 1 || !(/^[a-zA-Z0-9]+$/.test(value.substring(1)))) {
      return { 'invalidHashtagNumber': true };
    }
    return null;
  }

  selectColor(color: string){
    this.validateForm.patchValue({ color: color });
  }

  handleOk() {
    if(this.validateForm.valid){
      let tagData = {
        id: this.updateTagData.id,
        name: this.validateForm.value.name!,
        color: this.validateForm.value.color!
      };
      console.log(this.updateTagData);
      this.tagService.updateTag(this.updateTagData.id!, tagData).subscribe({
        next: (response) => {
          console.log(response);
          this.sendUpdateTag.emit();
          this.isVisibleModalUpdateTag = false;
          this.isVisibleModalUpdateTagChange.emit(this.isVisibleModalUpdateTag);
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

    this.isVisibleModalUpdateTag = false;
    this.isVisibleModalUpdateTagChange.emit(this.isVisibleModalUpdateTag);
  }
}
