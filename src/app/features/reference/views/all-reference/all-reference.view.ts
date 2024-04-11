import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzTableModule } from 'ng-zorro-antd/table';

import { Reference } from '../../core/interfaces/references/reference-response';
import { UpdateRefs } from '../../components/modal/addReference/update-references.service';
import { ReferenceFacade } from '../../aplication/facade/reference.facade';
import { Observable, of } from 'rxjs';

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
  ],
})
export class AllReference implements OnInit{
  private readonly referenceServ: ReferenceFacade = inject(ReferenceFacade);
  private readonly updateRefs: UpdateRefs = inject(UpdateRefs)

  logoEdit = '../../../../../assets/modules/references/edit.png';
  listOfDisplayReferences: Reference[] = [];
  obs$!: Observable<Reference[]>;
  searchValue = '';
  visible = false;

  ngOnInit() {
    this.updateRefs.updateReference.subscribe(() => {
      this.getReference();
    });
  }

  getReference() {
    this.obs$ = this.referenceServ.getAllReference();
    this.obs$.subscribe(list => this.listOfDisplayReferences=list)
  }

  reset(): void {
    this.searchValue = '';
    this.getReference();
  }

  search(): void {
    this.visible = false;
    let obsFiltered!: Observable<Reference[]>;    
    this.obs$.subscribe((list) => {
      obsFiltered = of(
        list.filter(
          (item: Reference) => item.title.indexOf(this.searchValue) !== -1
        )
      );
      this.obs$ = obsFiltered;
    });
  }

  getAuthorName(ref: Reference): string[] {
    return ref.referenceAuthor.map((obj) => obj.author.name);
  }

  getTagName(ref: Reference): string[] {
    return ref.referenceTag.map((obj) => obj.tag.name);
  }

  newClick() {}
}
