import { Injectable, inject } from '@angular/core';
import { AllTagRepository } from '../../domain/repository/Tag.repository';

@Injectable()
export class ReferenceFacade {
  
  getTag = inject(AllTagRepository)

  getAllTags(){
    return this.getTag.getAllTags();
  }
  
}