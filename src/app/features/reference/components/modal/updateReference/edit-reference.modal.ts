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

import { NzI18nService, en_US } from 'ng-zorro-antd/i18n';
import { ReferenceFacade } from '../../../aplication/facade/reference.facade';
import { ReferenceUpdateBody } from '../../../core/interfaces/references/reference-update-body';
import { UpdateTableReference } from '../addReference/add-references.service';

@Component({
  standalone: true,
  selector: 'edit-reference-modal',
  templateUrl: './edit-reference.modal.html',
  styleUrl: './edit-reference.modal.scss',
  imports: [
    NzModalModule,
    NzFormModule,
    ReactiveFormsModule,
    NzUploadModule,
    NzIconModule,
    NzSelectModule,
    NzDatePickerModule,
    FormsModule,
  ],
})
export class EditReferenceModalComponent implements OnInit {
  @Input() isVisibleMiddle = false;
  @Output() isVisibleMiddleChange = new EventEmitter<boolean>();
  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly updateRefs: UpdateTableReference =
    inject(UpdateTableReference);
  private readonly refServ: ReferenceFacade = inject(ReferenceFacade);
  private readonly i18n: NzI18nService = inject(NzI18nService);

  @Input() editableReference!: ReferenceUpdateBody;

  validateForm!: FormGroup<{
    title: FormControl<string | null>;
    dateOfPublication: FormControl<Date | null>;
    publicationPlace: FormControl<string | null>;
    referenceAuthor: FormControl<string | null>;
    referenceTag: FormControl<string | null>;
  }>;

  ngOnInit(): void {
    this.i18n.setLocale(en_US);

    this.validateForm = this.fb.group({
      title: [this.editableReference.title, [Validators.required]],
      dateOfPublication: [
        this.editableReference.dateOfPublication,
        [Validators.required],
      ],
      publicationPlace: [
        this.editableReference.publicationPlace,
        [Validators.required],
      ],
      referenceAuthor: [''],
      referenceTag: ['']
    });
  }

  handleOk(): void {
    if (this.validateForm.valid) {
      this.editableReference = {
        id: this.editableReference.id,
        title: this.validateForm.value.title!,
        dateOfPublication: this.validateForm.value.dateOfPublication!,
        publicationPlace: this.validateForm.value.publicationPlace!,
        createReferenceAuthors: [],
        updateReferenceAuthors: [],
        deleteReferenceAuthors: [],
        createReferenceTags: [],
        updateReferenceTags: [],
        deleteReferenceTags: []
      }
      console.log(this.editableReference.id,this.editableReference);
      this.refServ.updateReference(this.editableReference.id!,this.editableReference).subscribe({
        next: (response) => this.updateRefs.updateTableReference.next(false),
        error: (messageError) => console.log(messageError),
      });
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

  addAuthor(value: string): void {}

  addTag(value: string) {}
}
