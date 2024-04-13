import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class UpdateTableReference {
  
  updateTableReference = new BehaviorSubject<boolean>(true);
}