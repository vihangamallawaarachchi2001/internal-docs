"use server"

import { connectToDatabase } from "./db"
import { DocumentModel, TagModel } from "./models"
import type { Document, CreateDocumentInput, UpdateDocumentInput } from "./types"
import type mongoose from "mongoose"

// Get all documents
export async function getAllDocuments(): Promise<Document[]> {
  await connectToDatabase()

  const documents = await DocumentModel.find().populate("category").populate("tags").sort({ updatedAt: -1 }).lean()

  return JSON.parse(JSON.stringify(documents))
}

// Get recent documents
export async function getRecentDocuments(limit = 6): Promise<Document[]> {
  await connectToDatabase()

  const documents = await DocumentModel.find()
    .populate("category")
    .populate("tags")
    .sort({ updatedAt: -1 })
    .limit(limit)
    .lean()

  return JSON.parse(JSON.stringify(documents))
}

// Get document by ID
export async function getDocumentById(id: string): Promise<Document | null> {
  await connectToDatabase()

  try {
    const document = await DocumentModel.findById(id).populate("category").populate("tags").lean()

    return document ? JSON.parse(JSON.stringify(document)) : null
  } catch (error) {
    console.error("Error fetching document:", error)
    return null
  }
}

// Get documents by category
export async function getDocumentsByCategory(categoryId: string): Promise<Document[]> {
  await connectToDatabase()

  const documents = await DocumentModel.find({ category: categoryId })
    .populate("category")
    .populate("tags")
    .sort({ updatedAt: -1 })
    .lean()

  return JSON.parse(JSON.stringify(documents))
}

// Get document count by category
export async function getCategoryDocumentCount(categoryId: string): Promise<number> {
  await connectToDatabase()

  return await DocumentModel.countDocuments({ category: categoryId })
}

// Create document
export async function createDocument(input: CreateDocumentInput): Promise<Document> {
  await connectToDatabase()

  // Process tags
  const tagIds: mongoose.Types.ObjectId[] = []
  if (input.tags && input.tags.length > 0) {
    for (const tagName of input.tags) {
      let tag = await TagModel.findOne({ name: tagName })
      if (!tag) {
        tag = await TagModel.create({ name: tagName })
      }
      tagIds.push(tag._id)
    }
  }

  const document = await DocumentModel.create({
    title: input.title,
    content: input.content,
    category: input.category || null,
    tags: tagIds.length > 0 ? tagIds : [],
  })

  const populatedDoc = await DocumentModel.findById(document._id).populate("category").populate("tags").lean()

  return JSON.parse(JSON.stringify(populatedDoc))
}

// Update document
export async function updateDocument(id: string, input: UpdateDocumentInput): Promise<Document | null> {
  await connectToDatabase()

  // Process tags
  const tagIds: mongoose.Types.ObjectId[] = []
  if (input.tags && input.tags.length > 0) {
    for (const tagName of input.tags) {
      let tag = await TagModel.findOne({ name: tagName })
      if (!tag) {
        tag = await TagModel.create({ name: tagName })
      }
      tagIds.push(tag._id)
    }
  }

  const updateData: any = {}
  if (input.title !== undefined) updateData.title = input.title
  if (input.content !== undefined) updateData.content = input.content
  if (input.category !== undefined) updateData.category = input.category || null
  if (input.tags !== undefined) updateData.tags = tagIds

  const document = await DocumentModel.findByIdAndUpdate(id, updateData, { new: true })
    .populate("category")
    .populate("tags")
    .lean()

  return document ? JSON.parse(JSON.stringify(document)) : null
}

// Delete document
export async function deleteDocument(id: string): Promise<boolean> {
  await connectToDatabase()

  const result = await DocumentModel.findByIdAndDelete(id)
  return !!result
}

// Search documents
export async function searchDocuments(query: string): Promise<Document[]> {
  await connectToDatabase()

  const documents = await DocumentModel.find({
    $or: [{ title: { $regex: query, $options: "i" } }, { content: { $regex: query, $options: "i" } }],
  })
    .populate("category")
    .populate("tags")
    .sort({ updatedAt: -1 })
    .lean()

  return JSON.parse(JSON.stringify(documents))
}
