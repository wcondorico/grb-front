import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzTableModule } from 'ng-zorro-antd/table';

import { AuthorFacade } from '../../aplication/facade/author.facade';
import { Authors } from '../../core/interfaces/authors/authors';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AddAuthorModal } from "../../components/modal/add-author/add-author.modal";
import { UpdateAuthorModal } from "../../components/modal/update-author/update-author.modal";

@Component({
    selector: 'app-authors',
    standalone: true,
    templateUrl: './authors.component.html',
    styleUrl: './authors.component.scss',
    imports: [
        NzLayoutModule,
        NzTableModule,
        NzDropDownModule,
        FormsModule,
        NzIconModule,
        CommonModule,
        AddAuthorModal,
        UpdateAuthorModal
    ]
})
export class AuthorsComponent implements OnInit {
  private readonly authorService: AuthorFacade = inject(AuthorFacade); 
  private readonly deleteModal: NzModalService = inject(NzModalService);

  listOfAuthors: Authors[] = [];
  listOfDisplayAuthors!: Authors[];
  searchValue = '';
  visibleSearch = false;
  isVisibleModalAddAuthor = false;
  isVisibleModalUpdateAuthor = false;
  updateAuthorData!: Authors

  ngOnInit(): void {
    this.getAllAuthors();
  }

  getAllAuthors() {
    this.authorService.getAllAuthors().subscribe((list) => {
      this.sortName(list);
      this.listOfAuthors = list;
      this.listOfDisplayAuthors = [...this.listOfAuthors];
    });
  }
  
  sortName(list: Authors[]): void {
    list.sort((a, b) => {
      const nameA = isNaN(Number(a.name)) ? a.name : Number(a.name);
      const nameB = isNaN(Number(b.name)) ? b.name : Number(b.name);
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visibleSearch = false;
    this.listOfDisplayAuthors = this.listOfAuthors.filter(
      (item: Authors) => item.name.indexOf(this.searchValue) !== -1
    );
  }

  updateAuthor(data: Authors) {
    this.updateAuthorData = data
    this.isVisibleModalUpdateAuthor = true
  }

  deleteAuthor(id: number) {
    this.deleteModal.confirm({
      nzTitle: '¿Estás seguro de eliminar este autor?',
      nzOkText: 'Si',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () =>
        this.authorService.deleteAuthor(id).subscribe((author) => {
          this.getAllAuthors();
          console.log(author);
        }),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel'),
    });
  }

  newAuthor() {
    this.isVisibleModalAddAuthor = true
  }
}
