import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { AuthorFacade } from '../../../aplication/facade/author.facade';
import { Authors } from '../../../core/interfaces/authors/authors';

@Component({
  standalone: true,
  selector: 'add-author-modal',
  templateUrl: './add-author.modal.html',
  styleUrl: './add-author.modal.scss',
  imports: [NzModalModule, NzFormModule, FormsModule, ReactiveFormsModule],
})
export class AddAuthorModal {
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private readonly authorService: AuthorFacade = inject(AuthorFacade);

  @Input() isVisibleModalAddAuthor = false;
  @Output() isVisibleModalAddAuthorChange = new EventEmitter<boolean>();
  @Output() sendAddAuthor = new EventEmitter<void>();

  addAuthor!: Authors;
  validateForm: FormGroup<{
    name: FormControl<string | null>
  }> = this.formBuilder.group({
    name: ['',[Validators.required, Validators.pattern('^[A-Za-z]+$')]]
  });



  handleOk() {
    if(this.validateForm.valid){
      this.addAuthor = {
        name: this.validateForm.value.name!
      };
      console.log(this.addAuthor);
      this.authorService.addAuthor(this.addAuthor).subscribe({
        next: (response) => {
          console.log(response);
          this.sendAddAuthor.emit();
          this.isVisibleModalAddAuthor = false;
          this.isVisibleModalAddAuthorChange.emit(this.isVisibleModalAddAuthor);
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
    console.log('cancel');
    this.isVisibleModalAddAuthor = false;
    this.isVisibleModalAddAuthorChange.emit(this.isVisibleModalAddAuthor);
  }
}
