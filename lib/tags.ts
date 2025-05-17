"use server"

import { connectToDatabase } from "./db"
import { TagModel, DocumentModel } from "./models"
import type { Tag, CreateTagInput } from "./types"

// Get all tags
export async function getTags(): Promise<Tag[]> {
  await connectToDatabase()

  const tags = await TagModel.find().sort({ name: 1 }).lean()

  return JSON.parse(JSON.stringify(tags))
}

// Get tag by ID
export async function getTagById(id: string): Promise<Tag | null> {
  await connectToDatabase()

  try {
    const tag = await TagModel.findById(id).lean()
    return tag ? JSON.parse(JSON.stringify(tag)) : null
  } catch (error) {
    console.error("Error fetching tag:", error)
    return null
  }
}

// Create tag
export async function createTag(input: CreateTagInput): Promise<Tag> {
  await connectToDatabase()

  const tag = await TagModel.create({
    name: input.name,
  })

  return JSON.parse(JSON.stringify(tag))
}

// Delete tag
export async function deleteTag(id: string): Promise<boolean> {
  await connectToDatabase()

  // Remove tag from all documents
  await DocumentModel.updateMany({ tags: id }, { $pull: { tags: id } })

  const result = await TagModel.findByIdAndDelete(id)
  return !!result
}

// Get tag document count
export async function getTagDocumentCount(tagId: string): Promise<number> {
  await connectToDatabase()

  return await DocumentModel.countDocuments({ tags: tagId })
}

// Get documents by tag
export async function getDocumentsByTag(tagId: string): Promise<any[]> {
  await connectToDatabase()

  const documents = await DocumentModel.find({ tags: tagId })
    .populate("category")
    .populate("tags")
    .sort({ updatedAt: -1 })
    .lean()

  return JSON.parse(JSON.stringify(documents))
}
