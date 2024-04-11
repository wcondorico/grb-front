import { Injectable, inject } from '@angular/core';
import { AllTagRepository } from '../../domain/repository/tag.repository';

@Injectable()
export class TagFacade {
  
  getTag = inject(AllTagRepository)

  getAllTags(){
    return this.getTag.getAllTags();
  }
}