import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzTableModule } from 'ng-zorro-antd/table';

import { TagFacade } from '../../aplication/facade/tag.facade';
import { Tag } from '../../core/interfaces/tags/tags';
import { AddTagComponent } from '../../components/modal/add-tag/add-tag.modal';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UpdateTagComponent } from "../../components/modal/update-tag/update-tag.modal";

@Component({
    selector: 'app-tags',
    standalone: true,
    templateUrl: './tags.component.html',
    styleUrl: './tags.component.scss',
    imports: [
        NzLayoutModule,
        NzTableModule,
        NzDropDownModule,
        FormsModule,
        NzIconModule,
        CommonModule,
        AddTagComponent,
        UpdateTagComponent
    ]
})
export class TagsComponent implements OnInit {
  private readonly tagService: TagFacade = inject(TagFacade);
  private readonly deleteModal: NzModalService = inject(NzModalService);

  listOfData: Tag[] = [];
  listOfDisplayData!: Tag[];
  isVisibleModalAddTag = false;
  isVisibleModalUpdateTag = false;
  searchValue = '';
  visibleSearch = false;
  updateTagData!: Tag

  ngOnInit(): void {
    this.getAllTags();
  }

  getAllTags() {
    this.tagService.getAllTags().subscribe((list) => {
      list.sort((a,b) => this.compare(a.name,b.name))
      this.listOfData = list;
      this.listOfDisplayData = [...this.listOfData];
    });
  }

  compare(a: string, b: string) {
    if (isNaN(Number(a)) && isNaN(Number(b))) return a.localeCompare(b);
    if (!isNaN(Number(a)) && !isNaN(Number(b))) return Number(a) - Number(b);
    if (isNaN(Number(a)))  return -1;
    else return 1;
  }
  
  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visibleSearch = false;
    this.listOfDisplayData = this.listOfData.filter(
      (item: Tag) => item.name.indexOf(this.searchValue) !== -1
    );
  }

  updateTag(data: Tag) {
    this.updateTagData = data;
    this.isVisibleModalUpdateTag = true
  }

  deleteTag(id: number) {
    this.deleteModal.confirm({
      nzTitle: '¿Estás seguro de eliminar esta etiqueta?',
      nzOkText: 'Si',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () =>
        this.tagService.deleteTag(id).subscribe((tag) => {
          this.getAllTags();
          console.log(tag);
        }),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel'),
    });
  }

  changeIsVisibleTagModalAdd() {
    this.isVisibleModalAddTag = true;
  }
}
