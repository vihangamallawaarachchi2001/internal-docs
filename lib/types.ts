export interface Document {
  _id: string
  title: string
  content: string
  category?: Category
  tags?: Tag[]
  createdAt: string
  updatedAt: string
}

export interface Category {
  _id: string
  name: string
  description: string
  createdAt: string
  updatedAt: string
}

export interface Tag {
  _id: string
  name: string
  createdAt: string
  updatedAt: string
}

export interface CreateDocumentInput {
  title: string
  content: string
  category?: string
  tags?: string[]
}

export interface UpdateDocumentInput {
  title?: string
  content?: string
  category?: string
  tags?: string[]
}

export interface CreateCategoryInput {
  name: string
  description: string
}

export interface UpdateCategoryInput {
  name?: string
  description?: string
}

export interface CreateTagInput {
  name: string
}
