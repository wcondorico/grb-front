import { Injectable, inject } from '@angular/core';
import { AllReferenceRepository } from '../../domain/repository/Reference.repository';

@Injectable()
export class ReferenceFacade {
  
  getReference = inject(AllReferenceRepository)

  getAllReference(){
    return this.getReference.getAllReference();
  }

  getAllTags(){
    return this.getAllReference
  }
  
}