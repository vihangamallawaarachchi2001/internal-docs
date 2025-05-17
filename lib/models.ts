import { Schema, model, models } from "mongoose"
import type { Document, Category, Tag } from "./types"

// Category Schema
const categorySchema = new Schema<Category>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
  },
  { timestamps: true },
)

// Tag Schema
const tagSchema = new Schema<Tag>(
  {
    name: { type: String, required: true, unique: true },
  },
  { timestamps: true },
)

// Document Schema
const documentSchema = new Schema<Document>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  },
  { timestamps: true },
)

// Export models
export const CategoryModel = models.Category || model<Category>("Category", categorySchema)
export const TagModel = models.Tag || model<Tag>("Tag", tagSchema)
export const DocumentModel = models.Document || model<Document>("Document", documentSchema)
