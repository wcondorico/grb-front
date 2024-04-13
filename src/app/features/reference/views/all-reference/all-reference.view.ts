import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';

import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';
import { ReferenceFacade } from '../../aplication/facade/reference.facade';
import { UpdateTableReference } from '../../components/modal/addReference/add-references.service';
import { EditReferenceModalComponent } from '../../components/modal/updateReference/edit-reference.modal';
import { ReferenceResponse } from '../../core/interfaces/references/reference-response';
import { ReferenceUpdateBody } from '../../core/interfaces/references/reference-update-body';

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
  ],
})
export class AllReference implements OnInit {
  private readonly referenceServ: ReferenceFacade = inject(ReferenceFacade);
  private readonly updateRefsTable: UpdateTableReference =
    inject(UpdateTableReference);
  private readonly deleteModal: NzModalService = inject(NzModalService);

  referenceListDisplay!: ReferenceResponse[];
  referenceList!: ReferenceResponse[];
  obs$!: Observable<ReferenceResponse[]>;
  searchValue = '';
  isVisibleSearch = false;
  isVisibleModalReference = false;
  editableReference!: ReferenceUpdateBody;

  ngOnInit() {
    this.updateRefsTable.updateTableReference.subscribe(() => {
      this.getReference();
    });
  }

  getReference() {
    this.obs$ = this.referenceServ.getAllReference();
    this.obs$.subscribe((list) => {
      list.sort((a, b) => {
        const titleA = isNaN(Number(a.title)) ? a.title : Number(a.title);
        const titleB = isNaN(Number(b.title)) ? b.title : Number(b.title);
        if (titleA < titleB) return -1;
        if (titleA > titleB) return 1;
        return 0;
      });
      this.referenceList = list;
      this.referenceListDisplay = list;
    });
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
    this.isVisibleModalReference = true;
  }

  deleteReference(id: number) {
    this.deleteModal.confirm({
      nzTitle: '¿Estás seguro de eliminar esta referencia?',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () =>
        this.referenceServ.deleteReference(id).subscribe((ref) => {
          this.getReference();
          console.log(ref);
        }),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel'),
    });
  }
}
