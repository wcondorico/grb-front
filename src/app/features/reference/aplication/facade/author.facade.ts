import { Injectable, inject } from '@angular/core';
import { AllAuthorRepository } from '../../domain/repository/author.repository';
import { Authors } from '../../core/interfaces/authors/authors';

@Injectable()
export class AuthorFacade {
  Author = inject(AllAuthorRepository)

  getAllAuthors() {
    return this.Author.getAllAuthors();
  }  

  addAuthor(body: Authors) {
    return this.Author.addAuthor(body);
  }

  deleteAuthor(id: number) {
    return this.Author.deleteAuthor(id);
  }

  updateAuthor(id: number, body: Authors) {
    return this.Author.updateAuthor(id,body);
  }
}