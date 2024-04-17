import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
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
import { AuthorsBody } from '../../../core/interfaces/authors/authors-update-body';

@Component({
  standalone: true,
  selector: 'update-author-modal',
  templateUrl: './update-author.modal.html',
  styleUrl: './update-author.modal.scss',
  imports: [NzModalModule, NzFormModule, FormsModule, ReactiveFormsModule],
})
export class UpdateAuthorModal implements OnInit {
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private readonly authorService: AuthorFacade = inject(AuthorFacade);

  @Input() isVisibleModalUpdateAuthor = false;
  @Output() isVisibleModalUpdateAuthorChange = new EventEmitter<boolean>();
  @Output() sendUpdateAuthor = new EventEmitter<void>();
  @Input() updateAuthorData!: Authors 
  
  validateForm!: FormGroup<{
    name: FormControl<string | null>;
  }>;

  ngOnInit(): void {
    this.validateForm = this.formBuilder.group({
      name: [this.updateAuthorData.name, [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
    });
  }

  handleOk() {
    if (this.validateForm.valid) {
      let authorData: AuthorsBody = {
        name: this.validateForm.value.name!
      };
      this.authorService.updateAuthor(this.updateAuthorData.id!,authorData).subscribe({
        next: (response) => {
          console.log(response);
          this.sendUpdateAuthor.emit();
          this.isVisibleModalUpdateAuthor = false;
          this.isVisibleModalUpdateAuthorChange.emit(this.isVisibleModalUpdateAuthor);
        },
        error: (messageError) => console.log('error',messageError),
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
    this.isVisibleModalUpdateAuthor = false;
    this.isVisibleModalUpdateAuthorChange.emit(this.isVisibleModalUpdateAuthor);
  }
}
