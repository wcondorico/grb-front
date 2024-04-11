import { ReferenceAuthor } from "./reference-author-response";
import { ReferenceTag } from "./reference-tag-response";

export interface Reference {
  id?: number;
  title: string;
  dateOfPublication: string | null;
  editorial?: string | null;
  publicationPlace: string | null;
  note?: string | null;
  createAt?: string | null;
  referenceAuthor: ReferenceAuthor[];
  referenceTag: ReferenceTag[];
}

