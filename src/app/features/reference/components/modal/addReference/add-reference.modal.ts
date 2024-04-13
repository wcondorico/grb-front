import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzUploadModule } from 'ng-zorro-antd/upload';

import { NzI18nService, en_US } from 'ng-zorro-antd/i18n';
import { AuthorFacade } from '../../../aplication/facade/author.facade';
import { ReferenceFacade } from '../../../aplication/facade/reference.facade';
import { TagFacade } from '../../../aplication/facade/tag.facade';
import { Authors } from '../../../core/interfaces/authors/authors';
import { ReferenceAuthorBody, ReferenceCreateBody, ReferenceTagBody } from '../../../core/interfaces/references/reference-create-body';
import { Tags } from '../../../core/interfaces/tags/tags';
import { UpdateTableReference } from './add-references.service';

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
    FormsModule
  ],
})
export class AddReferenceModalComponent implements OnInit{
  
  @Input() isVisibleMiddle = false;
  @Output() isVisibleMiddleChange = new EventEmitter<boolean>();
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private readonly tagService: TagFacade = inject(TagFacade);
  private readonly authorService: AuthorFacade = inject(AuthorFacade);
  private readonly referenceService: ReferenceFacade = inject(ReferenceFacade);
  private readonly updateReferences: UpdateTableReference = inject(UpdateTableReference);
  private readonly i18n: NzI18nService = inject(NzI18nService);
  
  listOfTags!: Tags[];
  listOfAuthors!: Authors[];
  authorSelected: ReferenceAuthorBody[]=[];
  tagSelected: ReferenceTagBody[]=[];
  addReference: ReferenceCreateBody = {
    title: '',
    publicationPlace: '',
    dateOfPublication: new Date()
  }

  ngOnInit(): void {
    this.tagService.getAllTags().subscribe(list => this.listOfTags=list)
    this.authorService.getAllAuthors().subscribe(list => this.listOfAuthors=list)
    this.i18n.setLocale(en_US);
  }

  validateForm: FormGroup<{
    title: FormControl<string|null>;
    dateOfPublication: FormControl<Date|null>;
    publicationPlace: FormControl<string|null>;
    referenceAuthors: FormControl<string|null>;
    referenceTags: FormControl<string|null>;
  }> = this.formBuilder.group({
    title: ['', [Validators.required]],
    dateOfPublication: [new Date(), [Validators.required]],
    publicationPlace: ['', [Validators.required]],
    referenceAuthors: [''],
    referenceTags: [''],
  });

  handleOk(): void {
    
    if (this.validateForm.valid) {
      this.addReference = {
        title: this.validateForm.value.title!,
        dateOfPublication: this.validateForm.value.dateOfPublication!,
        publicationPlace: this.validateForm.value.publicationPlace!,
        referenceAuthors: this.authorSelected,
        referenceTags: this.tagSelected
      }
      console.log(this.addReference);
      this.referenceService.addReference(this.addReference).subscribe({
          next:response => this.updateReferences.updateTableReference.next(false),
          error: messageError => console.log(messageError)          
        })
      
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

  handleCancel(): void {
    this.isVisibleMiddle = false;
    this.isVisibleMiddleChange.emit(this.isVisibleMiddle);
  }
  
  selectAuthor(id: number): void {
    this.authorSelected.push({
      authorId: Number(id)
    })
    console.log(this.authorSelected);
  }

  selectTag(id: number): void{
    this.tagSelected.push({
      tagId: Number(id)
    })
  }

}
