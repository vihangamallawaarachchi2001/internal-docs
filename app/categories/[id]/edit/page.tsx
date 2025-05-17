"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getCategoryById, updateCategory } from "@/lib/categories"
import { toast } from "@/hooks/use-toast"

interface EditCategoryPageProps {
  params: {
    id: string
  }
}

export default function EditCategoryPage({ params }: EditCategoryPageProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const category = await getCategoryById(params.id)
        if (category) {
          setName(category.name)
          setDescription(category.description)
        } else {
          router.push("/categories")
          toast({
            title: "Category not found",
            description: "The category you're trying to edit doesn't exist.",
            variant: "destructive",
          })
        }
      } catch (error) {
        console.error("Failed to fetch category:", error)
        toast({
          title: "Error",
          description: "Failed to load category data. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchCategory()
  }, [params.id, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await updateCategory(params.id, {
        name,
        description,
      })

      toast({
        title: "Category updated",
        description: `${name} has been updated successfully.`,
      })

      router.push(`/categories/${params.id}`)
      router.refresh()
    } catch (error) {
      console.error("Failed to update category:", error)
      toast({
        title: "Error",
        description: "Failed to update category. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container max-w-2xl py-10">
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-center">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Loading category...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container max-w-2xl py-10">
      <Button variant="ghost" className="mb-6" asChild>
        <Link href={`/categories/${params.id}`}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Category
        </Link>
      </Button>

      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Edit Category</CardTitle>
          <CardDescription>Update category details</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Category Name</Label>
              <Input
                id="name"
                placeholder="e.g., Engineering, Product, Design"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe what kind of documentation belongs in this category"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="min-h-[120px]"
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
