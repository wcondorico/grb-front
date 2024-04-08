import { Component, OnInit, inject } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { ReferenceFacade } from '../../aplication/facade/reference.facade';
import { ReferenceInterface } from '../../core/interfaces/all-reference';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CommonModule } from '@angular/common';

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
        CommonModule
    ]
})
export class AuthorsComponent implements OnInit{

    private readonly apiService: ReferenceFacade = inject(ReferenceFacade) 
  
    listOfData: ReferenceInterface[] = []
    listOfDisplayData!: ReferenceInterface[]
  
    ngOnInit(): void {
      this.apiService.getAllReference().subscribe(list => {
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
        (item: ReferenceInterface) => item.title.indexOf(this.searchValue) !== -1
      )
    }
  
    getAuthorName(ref: ReferenceInterface): string[]{
      return ref.referenceAuthor.map(obj => obj.author.name)
    }
  
    getTagName(ref: ReferenceInterface): string[]{
      return ref.referenceTag.map(obj => obj.tag.name)
    }

}
