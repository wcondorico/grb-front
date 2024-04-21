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
import { NzI18nService, en_US } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzButtonModule } from 'ng-zorro-antd/button';


import { AuthorFacade } from '../../../aplication/facade/author.facade';
import { ReferenceFacade } from '../../../aplication/facade/reference.facade';
import { TagFacade } from '../../../aplication/facade/tag.facade';
import { Authors } from '../../../core/interfaces/authors/authors';
import {
  ReferenceAuthorBody,
  ReferenceCreateBody,
  ReferenceTagBody,
} from '../../../core/interfaces/references/reference-create-body';
import { Tag } from '../../../core/interfaces/tags/tags';
import { UpdateTableReference } from './add-references.service';
import { ColorPickerComponent } from "../../color-picker/color-picker.component";


@Component({
    standalone: true,
    selector: 'add-reference-modal',
    templateUrl: './add-reference.modal.html',
    styleUrl: './add-reference.modal.scss',
    imports: [
        NzModalModule,
        NzFormModule,
        ReactiveFormsModule,
        NzUploadModule,
        NzIconModule,
        NzSelectModule,
        NzDatePickerModule,
        FormsModule,
        ColorPickerComponent,
        NzButtonModule
    ]
})
export class AddReferenceModalComponent implements OnInit {
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private readonly tagService: TagFacade = inject(TagFacade);
  private readonly authorService: AuthorFacade = inject(AuthorFacade);
  private readonly referenceService: ReferenceFacade = inject(ReferenceFacade);
  private readonly updateReferences: UpdateTableReference =
    inject(UpdateTableReference);
  private readonly i18n: NzI18nService = inject(NzI18nService);
  
  @Input() isVisibleModalAddReference = false;
  @Output() isVisibleModalAddReferenceChange = new EventEmitter<boolean>();
  listOfTags!: Tag[];
  listOfAuthors!: Authors[];
  authorsSelected: string[] = [];
  tagsSelected: string[] = [];
  authorsToAdd: ReferenceAuthorBody[] = [];
  tagToAdd: ReferenceTagBody[] = [];
  addReference: ReferenceCreateBody = {
    title: '',
    publicationPlace: '',
    dateOfPublication: new Date(),
  };
  
  validateForm: FormGroup<{
    title: FormControl<string | null>;
    dateOfPublication: FormControl<Date | null>;
    publicationPlace: FormControl<string | null>;
    referenceTags: FormControl<string | null>;
  }> = this.formBuilder.group({
    title: ['', [Validators.required]],
    dateOfPublication: [new Date(), [Validators.required]],
    publicationPlace: ['', [Validators.required]],
    referenceTags: [''],
  });
  
  ngOnInit(): void {
    this.i18n.setLocale(en_US);
    this.tagService.getAllTags().subscribe((list) => (this.listOfTags = list));
    this.authorService
      .getAllAuthors()
      .subscribe((list) => (this.listOfAuthors = list));
  }

  handleOk(): void {
    if (this.validateForm.valid) {
      this.addReference = {
        title: this.validateForm.value.title!,
        dateOfPublication: this.validateForm.value.dateOfPublication!,
        publicationPlace: this.validateForm.value.publicationPlace!,
        referenceAuthors: this.authorsToAdd,
        referenceTags: this.tagToAdd,
      };

      this.referenceService.addReference(this.addReference).subscribe({
        next: () => {
          this.updateReferences.updateTableReference.next(false),
          this.isVisibleModalAddReference = false;
          this.isVisibleModalAddReferenceChange.emit(this.isVisibleModalAddReference);
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
    this.isVisibleModalAddReference = false;
    this.isVisibleModalAddReferenceChange.emit(this.isVisibleModalAddReference);
  }

  isSelectedAuthor(author: string): boolean {
    return this.authorsSelected.indexOf(author) !== -1;
  }

  isSelectedTag(tag: string): boolean {
    return this.tagsSelected.indexOf(tag) !== -1;
  }
  
  selectAuthor(list: string[]): void {
    let authorsSelect: ReferenceAuthorBody[] = []
    list.forEach(authorSelected => {
      this.listOfAuthors.map(objAuthor => objAuthor.name === authorSelected
        ? authorsSelect.push({
          authorId: objAuthor.id!,
          })
        : null)
    })
    this.authorsToAdd = authorsSelect;
  }

  selectTag(list: string[]): void {
    let tagsSelect: ReferenceTagBody[] = []
    list.forEach(tagSelected => {
      this.listOfTags.map(objTag => objTag.name === tagSelected
        ? tagsSelect.push({
          tagId: objTag.id!,
          })
        : null)
    })
    this.tagToAdd = tagsSelect;
  }
}
