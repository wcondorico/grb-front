export interface ReferenceUpdateBody {
  id?: number,
  title: string,
  dateOfPublication: Date,
  publicationPlace: string,
  createReferenceAuthors: CreateReferenceAuthors[],
  updateReferenceAuthors: UpdateReferenceAuthors[],
  deleteReferenceAuthors: DeleteReferenceAuthors[],
  createReferenceTags: CreateReferenceTag[],
  updateReferenceTags: UpdateReferenceTag[],
  deleteReferenceTags: DeleteReferenceTag[]
}

interface CreateReferenceAuthors {
  authorId: number
}

interface UpdateReferenceAuthors {
  id: number
  authorId: number
}

interface DeleteReferenceAuthors {
  id: number
}

interface CreateReferenceTag {
  tagId: number
}

interface UpdateReferenceTag {
  id: number
  tagId: number
}

interface DeleteReferenceTag {
  id: number
}