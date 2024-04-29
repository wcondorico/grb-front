import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class UpdateTableReference {
  
  updateTableReference: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
}