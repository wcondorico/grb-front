import { CommonModule } from '@angular/common';
import { Component, OnInit, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzButtonComponent } from 'ng-zorro-antd/button';

import { ReferenceFacade } from '../../aplication/facade/reference.facade';
import { UpdateTableReference } from '../../components/modal/add-reference/add-references.service';
import { EditReferenceModalComponent } from '../../components/modal/update-reference/update-reference.modal';
import { ReferenceResponse } from '../../core/interfaces/references/reference-response';
import { ReferenceUpdateBody } from '../../core/interfaces/references/reference-update-body';
import { AddReferenceModalComponent } from '../../components/modal/add-reference/add-reference.modal';

@Component({
  selector: 'app-all-reference',
  standalone: true,
  templateUrl: './all-reference.view.html',
  styleUrl: './all-reference.view.scss',
  imports: [
    NzLayoutModule,
    NzTableModule,
    NzDropDownModule,
    FormsModule,
    NzIconModule,
    CommonModule,
    NzModalModule,
    EditReferenceModalComponent,
    NzButtonComponent,
    AddReferenceModalComponent,
  ],
})
export class AllReference implements OnInit {
  private readonly referenceService: ReferenceFacade = inject(ReferenceFacade);
  private readonly serviceUpdateTableReference: UpdateTableReference =
    inject(UpdateTableReference);
  private readonly deleteModal: NzModalService = inject(NzModalService);

  referenceList!: ReferenceResponse[];
  referenceListDisplay!: ReferenceResponse[];
  searchValue = '';
  isVisibleSearch = false;
  isVisibleModalAddReference = false;
  isVisibleModalUpdateReference = false;
  editableReference!: ReferenceUpdateBody;
  authorsSelected: string[] = []
  tagsSelected: string[] = []

  ngOnInit() {
    this.serviceUpdateTableReference.updateTableReference.subscribe(() => {
      this.getReference();
    });
  }

  getReference() {
    this.referenceService.getAllReference().subscribe((list) => {
      list.sort((a,b) => this.compare(a.title,b.title))
      this.referenceList = list;
      this.referenceListDisplay = list;
    });
  }

  compare(a: string, b: string) {
    if (isNaN(Number(a)) && isNaN(Number(b))) return a.localeCompare(b);
    if (!isNaN(Number(a)) && !isNaN(Number(b))) return Number(a) - Number(b);
    if (isNaN(Number(a))) return -1;
    return 1;
  }

  search(): void {
    if (!this.searchValue) this.referenceListDisplay = this.referenceList;
    this.referenceListDisplay = this.referenceList.filter(
      (item: ReferenceResponse) => item.title.indexOf(this.searchValue) !== -1
    );
  }

  reset(): void {
    this.searchValue = '';
    this.getReference();
  }

  getAuthorName(ref: ReferenceResponse): string[] {
    return ref.referenceAuthor
      ? ref.referenceAuthor.map((obj) => obj.author.name)
      : [];
  }

  getTagName(ref: ReferenceResponse): string[] {
    return ref.referenceTag ? ref.referenceTag.map((obj) => obj.tag.name) : [];
  }

  updateReference(data: ReferenceResponse) {
    this.editableReference = {
      id: data.id,
      title: data.title,
      dateOfPublication: new Date(data.dateOfPublication),
      publicationPlace: data.publicationPlace,
      createReferenceAuthors: [],
      updateReferenceAuthors: [],
      deleteReferenceAuthors: [],
      createReferenceTags: [],
      updateReferenceTags: [],
      deleteReferenceTags: [],
    };
    this.isVisibleModalUpdateReference = true;
    this.authorsSelected = this.getAuthorName(data)
    this.tagsSelected = this.getTagName(data)
  }

  deleteReference(id: number) {
    this.deleteModal.confirm({
      nzTitle: '¿Estás seguro de eliminar esta referencia?',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () =>
        this.referenceService.deleteReference(id).subscribe((ref) => {
          this.getReference();
          console.log(ref);
        }),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel'),
    });
  }

  changeIsVisibleModalUpdate() {
    this.isVisibleModalUpdateReference = true;
  }
  changeIsVisibleModalAdd() {
    this.isVisibleModalAddReference = true;
  }
}
