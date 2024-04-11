import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzUploadModule } from 'ng-zorro-antd/upload';

import { AuthorFacade } from '../../../aplication/facade/author.facade';
import { ReferenceFacade } from '../../../aplication/facade/reference.facade';
import { TagFacade } from '../../../aplication/facade/tag.facade';
import { Authors } from '../../../core/interfaces/authors/authors';
import { ReferenceBody } from '../../../core/interfaces/references/reference-body';
import { Tags } from '../../../core/interfaces/tags/tags';
import { UpdateRefs } from './update-references.service';

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
    NzSelectModule
  ],
})
export class ModalComponent implements OnInit{
  
  @Input() isVisibleMiddle = false;
  @Output() isVisibleMiddleChange = new EventEmitter<boolean>();
  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly tagServ: TagFacade = inject(TagFacade)
  private readonly authorServ: AuthorFacade = inject(AuthorFacade)
  private readonly RefServ: ReferenceFacade = inject(ReferenceFacade)
  private readonly updateRefs: UpdateRefs = inject(UpdateRefs)
  listOfTags!: Tags[]
  listOfAuthors!: Authors[]

  ngOnInit(): void {
    this.tagServ.getAllTags().subscribe(list => this.listOfTags=list)
    this.authorServ.getAllAuthors().subscribe(list => this.listOfAuthors=list)
  }

  validateForm: FormGroup<{
    title: FormControl<string|null>;
    /* dateOfPublication?: FormControl<Date>; */
    publicationPlace: FormControl<string|null>;
    /* referenceAuthor?: FormControl<string>;
    referenceTag?: FormControl<string>; */
  }> = this.fb.group({
    title: ['', [Validators.required]],
    /* dateOfPublication: [''], */
    publicationPlace: ['', [Validators.required]],
    /* referenceAuthor: [''],
    referenceTag: [''] */
  });

  handleOk(): void {
    
    /* let dateOfPublicationFormat = */

    if (this.validateForm.valid) {
      let addReference: ReferenceBody = {
        title: this.validateForm.value.title!,
        /* dateOfPublication: this.validateForm.value.dateOfPublication!, */
        publicationPlace: this.validateForm.value.publicationPlace!,
      }
      this.RefServ.addReference(addReference).subscribe(list => console.log(list))
      this.updateRefs.updateReference.next(false)
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

  addAuthor(value: string): void {
  }

  addTag(value: string){
  }

}
