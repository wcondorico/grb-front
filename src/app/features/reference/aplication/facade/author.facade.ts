import { Injectable, inject } from '@angular/core';
import { AllAuthorRepository } from '../../domain/repository/author.repository';

@Injectable()
export class AuthorFacade {
  getAuthor = inject(AllAuthorRepository)

  getAllAuthors(){
    return this.getAuthor.getAllAuthors();
  }  
}