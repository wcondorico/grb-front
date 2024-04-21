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

import { NzButtonModule } from 'ng-zorro-antd/button';
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
import { ReferenceResponse } from '../../../core/interfaces/references/reference-response';
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
    NzButtonModule,
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
  @Input() referenceResponse!: ReferenceResponse;
  @Output() isVisibleModalUpdateReferenceChange = new EventEmitter<boolean>();
  @Output() sendUpdateReference = new EventEmitter<void>();
  updateReference!: ReferenceUpdateBody;
  authorsSelectedReceived: string[] = [];
  tagsSelectedReceived: string[] = [];
  listOfTags!: Tag[];
  listOfAuthors!: Authors[];
  validateForm!: FormGroup<{
    title: FormControl<string | null>;
    dateOfPublication: FormControl<Date | null>;
    publicationPlace: FormControl<string | null>;
  }>;
  authorsIdsToCreate: number[] = [];
  authorRelationsIdsToUpdate: number[] = [];
  authorsIdsToUpdated: number[] = [];
  authorRelationIdsToDelete: number[] = [];
  tagsIdsToCreate: number[] = [];
  tagRelationsIdsToUpdate: number[] = [];
  tagsIdsToUpdated: number[] = [];
  tagRelationIdsToDelete: number[] = [];

  ngOnInit(): void {
    this.i18n.setLocale(en_US);
    this.tagService.getAllTags().subscribe((list) => (this.listOfTags = list));
    this.authorService.getAllAuthors().subscribe((list) => {
      this.listOfAuthors = list;
    });

    this.updateReference = {
      id: this.referenceResponse.id,
      title: this.referenceResponse.title,
      dateOfPublication: new Date(this.referenceResponse.dateOfPublication),
      publicationPlace: this.referenceResponse.publicationPlace,
      createReferenceAuthors: [],
      updateReferenceAuthors: [],
      deleteReferenceAuthors: [],
      createReferenceTags: [],
      updateReferenceTags: [],
      deleteReferenceTags: [],
    };

    this.validateForm = this.fb.group({
      title: [this.referenceResponse.title, [Validators.required]],
      dateOfPublication: [
        new Date(this.referenceResponse.dateOfPublication),
        [Validators.required],
      ],
      publicationPlace: [
        this.referenceResponse.publicationPlace,
        [Validators.required],
      ],
    });
    this.authorsSelectedReceived = this.authorsSelected;
    this.tagsSelectedReceived = this.tagsSelected;
  }

  isSelectedAuthor(author: string): boolean {
    return this.authorsSelected.indexOf(author) !== -1;
  }

  isSelectedTag(tag: string): boolean {
    return this.tagsSelected.indexOf(tag) !== -1;
  }

  updateAuthors(listOfAuthors: string[]): void {
    let uneditedAuthors: string[] = [];
    let addedAuthors: string[] = [];
    let deletedAuthors: string[] = [];
    let updatedAuthors: string[] = [];

    listOfAuthors.forEach(author => {
      this.authorsSelectedReceived.indexOf(author) !== -1
        ? uneditedAuthors.push(author)
        : addedAuthors.push(author);
    });
    this.authorsSelectedReceived.forEach(author => {
      listOfAuthors.indexOf(author) === -1 ? deletedAuthors.push(author) : null;
    });
    updatedAuthors = addedAuthors.splice(0, deletedAuthors.length);

    if (addedAuthors.length) {
      this.authorsIdsToCreate = addedAuthors.map(author => {
        let objectAuthor = this.listOfAuthors.find(
          (authorObjectOfList) => authorObjectOfList.name === author
        );
        return objectAuthor?.id!;
      });
    }
    if (updatedAuthors.length) {
      let listOfRelationIdsDeleted: number[] = [];
      let listOfAuthorsIdsUpdated: number[] = [];
      deletedAuthors.forEach(author => {
        let relationOfAuthor = this.referenceResponse.referenceAuthor!.find(
          (relation) => relation.author.name === author
        )!;
        listOfRelationIdsDeleted.push(relationOfAuthor.id);
      });
      updatedAuthors.forEach(author => {
        let authorObject = this.listOfAuthors.find(
          (authorObj) => authorObj.name === author
        );
        listOfAuthorsIdsUpdated.push(authorObject?.id!);
      });
      this.authorRelationsIdsToUpdate = listOfRelationIdsDeleted;
      this.authorsIdsToUpdated = listOfAuthorsIdsUpdated;
    };

    if (deletedAuthors.length) {
      let listOfRelationsDeleted: number[] = [];
      let listToDeleteRelations = deletedAuthors.slice(updatedAuthors.length);
      listToDeleteRelations.forEach(author => {
        let relationOfAuthor = this.referenceResponse.referenceAuthor!.find(
          (relation) => relation.author.name === author
        );
        listOfRelationsDeleted.push(relationOfAuthor?.id!);
      });
      this.authorRelationIdsToDelete = listOfRelationsDeleted;
    };
  }

  updateTag(listOfTags: string[]) {
    let uneditedTags: string[] = [];
    let addedTags: string[] = [];
    let deletedTags: string[] = [];
    let updatedTags: string[] = [];

    listOfTags.forEach(tag => {
      this.tagsSelectedReceived.indexOf(tag) !== -1
        ? uneditedTags.push(tag)
        : addedTags.push(tag);
    });
    this.tagsSelectedReceived.forEach(tag => {
      listOfTags.indexOf(tag) === -1 ? deletedTags.push(tag) : null;
    });
    updatedTags = addedTags.splice(0, deletedTags.length);

    if (addedTags.length) {
      this.tagsIdsToCreate = addedTags.map(tag => {
        let objectTag = this.listOfTags.find(
          (TagObj) => TagObj.name === tag
        );
        return objectTag?.id!;
      });
    };
    
    if (updatedTags.length) {
      let listOfRelationIdsDeleted: number[] = [];
      let listOfTagsIdsUpdated: number[] = [];
      deletedTags.forEach(tag => {
        let relationOfTag = this.referenceResponse.referenceTag!.find(
          (relation) => relation.tag.name === tag
        )!;
        listOfRelationIdsDeleted.push(relationOfTag.id);
      });
      updatedTags.forEach(tag => {
        let tagObject = this.listOfTags.find(
          (tagObj) => tagObj.name === tag
        );
        listOfTagsIdsUpdated.push(tagObject?.id!);
      });
      this.tagRelationsIdsToUpdate = listOfRelationIdsDeleted;
      this.tagsIdsToUpdated = listOfTagsIdsUpdated;
    };

    if (deletedTags.length) {
      let listOfRelationsDeleted: number[] = [];
      let listToDeleteRelations = deletedTags.slice(updatedTags.length);
      listToDeleteRelations.forEach(tag => {
        let relationOfTag = this.referenceResponse.referenceTag!.find(
          (relation) => relation.tag.name === tag
        );
        listOfRelationsDeleted.push(relationOfTag?.id!);
      });
      this.tagRelationIdsToDelete = listOfRelationsDeleted;
    };
  }

  handleOk(): void {
    if (this.validateForm.valid) {
      //update create reference author
      this.authorsIdsToCreate.forEach((id) =>
        this.updateReference.createReferenceAuthors.push({ authorId: id! })
      );
      //update update reference author
      for (let i = 0; i < this.authorsIdsToUpdated.length; i++) {
        this.updateReference.updateReferenceAuthors.push({
          id: this.authorRelationsIdsToUpdate[i],
          authorId: this.authorsIdsToUpdated[i],
        });
      }
      //update delete reference author
      this.authorRelationIdsToDelete.forEach((id) =>
        this.updateReference.deleteReferenceAuthors.push({ id: id })
      );
      //update create reference tag
      this.tagsIdsToCreate.forEach((id) =>
        this.updateReference.createReferenceTags.push({ tagId: id! })
      );
      //update update reference tag
      for (let i = 0; i < this.tagsIdsToUpdated.length; i++) {
        this.updateReference.updateReferenceTags.push({
          id: this.tagRelationsIdsToUpdate[i],
          tagId: this.tagsIdsToUpdated[i],
        });
      }
      //update delete reference tag
      this.tagRelationIdsToDelete.forEach((id) =>
        this.updateReference.deleteReferenceTags.push({ id: id })
      );

      let updateReferenceData: ReferenceUpdateBody = {
        id: this.updateReference.id,
        title: this.validateForm.value.title!,
        dateOfPublication: this.validateForm.value.dateOfPublication!,
        publicationPlace: this.validateForm.value.publicationPlace!,
        createReferenceAuthors: this.updateReference.createReferenceAuthors,
        updateReferenceAuthors: this.updateReference.updateReferenceAuthors,
        deleteReferenceAuthors: this.updateReference.deleteReferenceAuthors,
        createReferenceTags: this.updateReference.createReferenceTags,
        updateReferenceTags: this.updateReference.updateReferenceTags,
        deleteReferenceTags: this.updateReference.deleteReferenceTags,
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
}
