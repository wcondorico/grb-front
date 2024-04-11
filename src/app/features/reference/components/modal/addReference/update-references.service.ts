import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class UpdateRefs {
  
  updateReference = new BehaviorSubject<boolean>(true);
  
  /* get updateReferenceGet() {
    return this.updateReference.asObservable();
  }

  set updateReferenceSet(data: boolean){
    this.updateReference.next(data)
  } */
}