import { Component, OnInit, inject } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ReferenceInterface } from '../../core/interfaces/all-reference';
import { MocServiceService } from '../../core/services/moc-service.service';
import { CommonModule  } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  imports: [
    NzTableModule,
    NzDropDownModule,
    FormsModule,
    NzIconModule ,
    CommonModule
  ]
})
export class TableComponent implements OnInit{
  private readonly apiService: MocServiceService = inject(MocServiceService) 
  
  listOfData: ReferenceInterface[] = []
  listOfDisplayData!: ReferenceInterface[]

  ngOnInit(): void {
    this.apiService.getJsonData().subscribe(list => {
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
