import { Injectable, inject } from '@angular/core';
import { ReferenceBody } from '../../core/interfaces/references/reference-body';
import { ReferenceRepository } from "../../domain/repository/reference.repository";

@Injectable()
export class ReferenceFacade {
  
  getReference = inject(ReferenceRepository)

  getAllReference(){
    return this.getReference.getAllReference();
  }  

  addReference(value: ReferenceBody){
    return this.getReference.addReference(value)
  }
}