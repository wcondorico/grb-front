export interface ReferenceCreateBody {
  title: string;
  dateOfPublication: Date;
  publicationPlace: string;
  referenceAuthors?: ReferenceAuthorBody[];
  referenceTags?: ReferenceTagBody[];
}

export interface ReferenceAuthorBody {
  authorId: number
}

export interface ReferenceTagBody {
  tagId: number;
}