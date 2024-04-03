import { ReferenceAuthor } from "./ReferenceAuthro";
import { ReferenceTag } from "./ReferenceTag";

export interface ReferenceInterface {
  id: number;
  title: string;
  dateOfPublication: string;
  editorial: null | string;
  publicationPlace: null | string;
  note: string;
  createAt: string;
  referenceAuthor: ReferenceAuthor[];
  referenceTag: ReferenceTag[];
}

