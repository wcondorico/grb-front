import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzTableModule } from 'ng-zorro-antd/table';

import { AuthorFacade } from '../../aplication/facade/author.facade';
import { Authors } from '../../core/interfaces/authors/authors';

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
  ],
})
export class AuthorsComponent implements OnInit {
  private readonly authorServ: AuthorFacade = inject(AuthorFacade);

  listOfAuthors: Authors[] = [];
  listOfDisplayAuthors!: Authors[];

  ngOnInit(): void {
    this.authorServ.getAllAuthors().subscribe((list) => {
      this.listOfAuthors = list;
      this.listOfDisplayAuthors = [...this.listOfAuthors];
    });
  }

  searchValue = '';
  visible = false;

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayAuthors = this.listOfAuthors.filter(
      (item: Authors) => item.name.indexOf(this.searchValue) !== -1
    );
  }
}
