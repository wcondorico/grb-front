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

import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzButtonModule } from 'ng-zorro-antd/button';

import { NzI18nService, en_US } from 'ng-zorro-antd/i18n';
import { AuthorFacade } from '../../../aplication/facade/author.facade';
import { ReferenceFacade } from '../../../aplication/facade/reference.facade';
import { TagFacade } from '../../../aplication/facade/tag.facade';
import { Authors } from '../../../core/interfaces/authors/authors';
import { ReferenceUpdateBody } from '../../../core/interfaces/references/reference-update-body';
import { Tag } from '../../../core/interfaces/tags/tags';

@Component({
  standalone: true,
  selector: 'update-reference-modal',
  templateUrl: './update-reference.modal.html',
  styleUrl: './update-reference.modal.scss',
  imports: [
    NzModalModule,
    NzFormModule,
    ReactiveFormsModule,
    NzUploadModule,
    NzIconModule,
    NzSelectModule,
    FormsModule,
    NzDatePickerModule,
    NzButtonModule
  ],
})
export class EditReferenceModalComponent implements OnInit {
  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly referenceService: ReferenceFacade = inject(ReferenceFacade);
  private readonly tagService: TagFacade = inject(TagFacade);
  private readonly authorService: AuthorFacade = inject(AuthorFacade);
  private readonly i18n: NzI18nService = inject(NzI18nService);

  @Input() isVisibleModalUpdateReference = false;
  @Input() authorsSelected!: string[];
  @Input() tagsSelected!: string[];
  @Input() updateReference!: ReferenceUpdateBody;
  @Output() isVisibleModalUpdateReferenceChange = new EventEmitter<boolean>();
  @Output() sendUpdateReference = new EventEmitter<void>();
  listOfTags!: Tag[];
  listOfAuthors!: Authors[];

  validateForm!: FormGroup<{
    title: FormControl<string | null>;
    dateOfPublication: FormControl<Date | null>;
    publicationPlace: FormControl<string | null>;
  }>;

  ngOnInit(): void {
    this.i18n.setLocale(en_US);
    this.tagService.getAllTags().subscribe((list) => (this.listOfTags = list));
    this.authorService
      .getAllAuthors()
      .subscribe((list) => (this.listOfAuthors = list));

    this.validateForm = this.fb.group({
      title: [this.updateReference.title, [Validators.required]],
      dateOfPublication: [
        this.updateReference.dateOfPublication,
        [Validators.required],
      ],
      publicationPlace: [
        this.updateReference.publicationPlace,
        [Validators.required],
      ],
    });
  }

  handleOk(): void {
    if (this.validateForm.valid) {
      let updateReferenceData: ReferenceUpdateBody = {
        id: this.updateReference.id,
        title: this.validateForm.value.title!,
        dateOfPublication: this.validateForm.value.dateOfPublication!,
        publicationPlace: this.validateForm.value.publicationPlace!,
        createReferenceAuthors: [],
        updateReferenceAuthors: [],
        deleteReferenceAuthors: [],
        createReferenceTags: [],
        updateReferenceTags: [],
        deleteReferenceTags: [],
      };
      this.referenceService
        .updateReference(this.updateReference.id!, updateReferenceData)
        .subscribe({
          next: (response) => {
            this.sendUpdateReference.emit();
            this.isVisibleModalUpdateReference = false;
            this.isVisibleModalUpdateReferenceChange.emit(
            this.isVisibleModalUpdateReference
            );
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
    this.isVisibleModalUpdateReference = false;
    this.isVisibleModalUpdateReferenceChange.emit(
      this.isVisibleModalUpdateReference
    );
  }

  addAuthor(value: number): void {

  }

  isSelectedAuthor(author: string): boolean {
    return this.authorsSelected.indexOf(author) !== -1;
  }

  isSelectedTag(tag: string): boolean {
    return this.tagsSelected.indexOf(tag) !== -1;
  }

  addTag(value: number) {}
}
