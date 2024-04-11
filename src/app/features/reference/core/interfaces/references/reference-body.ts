import { RefAuthorPost } from "./reference-author-body";
import { RefTagPost } from "./reference-tag-body";

export interface ReferenceBody {
  title: string;
  dateOfPublication?: string;
  publicationPlace: string;
  referenceAuthor?: RefAuthorPost[];
  referenceTag?: RefTagPost[];
}