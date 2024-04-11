import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzTableModule } from 'ng-zorro-antd/table';

import { TagFacade } from '../../aplication/facade/tag.facade';
import { Tags } from '../../core/interfaces/tags/tags';

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
        NzIconModule ,
        CommonModule
    ]
})
export class TagsComponent implements OnInit{

    private readonly tagServ: TagFacade = inject(TagFacade) 
  
    listOfData: Tags[] = []
    listOfDisplayData!: Tags[]
  
    ngOnInit(): void {
      this.tagServ.getAllTags().subscribe(list => {
        this.listOfData = list
        this.listOfDisplayData = [...this.listOfData];
      })
    }
    
    searchValue = '';
    visible = false;
    
    reset(): void {
      this.searchValue = '';
      this.search();
    }
    
    search(): void {
      this.visible = false;
      this.listOfDisplayData = this.listOfData.filter(
        (item: Tags) => item.name.indexOf(this.searchValue) !== -1
      )
    }
}
