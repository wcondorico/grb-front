import { Injectable, inject } from '@angular/core';
import { AllTagRepository } from '../../domain/repository/tag.repository';
import { Tag } from '../../core/interfaces/tags/tags';

@Injectable()
export class TagFacade {
  
  Tag = inject(AllTagRepository)

  getAllTags() {
    return this.Tag.getAllTags();
  }

  addTag(body: Tag) {
    return this.Tag.addTag(body);
  }

  deleteTag(id: number) {
    return this.Tag.deleteTag(id);
  }

  updateTag(id: number, body: Tag){
    return this.Tag.updateTag(id, body);
  }
}