import { Author } from "./Author";

export interface ReferenceAuthor {
  id: number;
  createAt: string;
  author: Author;
}