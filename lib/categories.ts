"use server"

import { connectToDatabase } from "./db"
import { CategoryModel } from "./models"
import type { Category, CreateCategoryInput, UpdateCategoryInput } from "./types"
import { DocumentModel } from "./models"

// Get all categories
export async function getCategories(): Promise<Category[]> {
  await connectToDatabase()

  const categories = await CategoryModel.find().sort({ name: 1 }).lean()

  return JSON.parse(JSON.stringify(categories))
}

// Get category by ID
export async function getCategoryById(id: string): Promise<Category | null> {
  await connectToDatabase()

  try {
    const category = await CategoryModel.findById(id).lean()
    return category ? JSON.parse(JSON.stringify(category)) : null
  } catch (error) {
    console.error("Error fetching category:", error)
    return null
  }
}

// Create category
export async function createCategory(input: CreateCategoryInput): Promise<Category> {
  await connectToDatabase()

  const category = await CategoryModel.create({
    name: input.name,
    description: input.description,
  })

  return JSON.parse(JSON.stringify(category))
}

// Update category
export async function updateCategory(id: string, input: UpdateCategoryInput): Promise<Category | null> {
  await connectToDatabase()

  const updateData: any = {}
  if (input.name !== undefined) updateData.name = input.name
  if (input.description !== undefined) updateData.description = input.description

  const category = await CategoryModel.findByIdAndUpdate(id, updateData, { new: true }).lean()

  return category ? JSON.parse(JSON.stringify(category)) : null
}

// Delete category
export async function deleteCategory(id: string): Promise<boolean> {
  await connectToDatabase()

  // Update documents to remove this category
  await DocumentModel.updateMany({ category: id }, { $set: { category: null } })

  const result = await CategoryModel.findByIdAndDelete(id)
  return !!result
}
