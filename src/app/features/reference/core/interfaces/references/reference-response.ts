export interface ReferenceResponse {
  id?: number;
  title: string;
  dateOfPublication: string ;
  editorial?: string;
  publicationPlace: string ;
  note?: string;
  createAt?: string;
  referenceAuthor?: ReferenceAuthorResponse[];
  referenceTag?: ReferenceTagResponse[];
}

interface ReferenceAuthorResponse {
  id: number;
  createAt: string;
  author: Name;
}

interface ReferenceTagResponse {
  id: number;
  createAt: string;
  tag: Name;
}

interface Name{
  id: number;
  name: string;
  createAt: string;
  color?: string;
}