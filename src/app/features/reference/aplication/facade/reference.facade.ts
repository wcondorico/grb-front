import { Injectable, inject } from '@angular/core';
import { ReferenceCreateBody } from '../../core/interfaces/references/reference-create-body';
import { ReferenceRepository } from "../../domain/repository/reference.repository";
import { ReferenceUpdateBody } from '../../core/interfaces/references/reference-update-body';

@Injectable()
export class ReferenceFacade {
  
  getReference = inject(ReferenceRepository)

  getAllReference(){
    return this.getReference.getAllReference();
  }  

  addReference(body: ReferenceCreateBody){
    return this.getReference.addReference(body)
  }

  deleteReference(id: number){
    return this.getReference.deleteReference(id)
  }

  updateReference(id:number, body:ReferenceUpdateBody){
    return this.getReference.updateReference(id, body)
  }
}