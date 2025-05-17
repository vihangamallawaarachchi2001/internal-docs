"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createTag } from "@/lib/tags"
import { toast } from "@/hooks/use-toast"

export default function NewTagPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [name, setName] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const newTag = await createTag({
        name,
      })

      toast({
        title: "Tag created",
        description: `#${name} has been created successfully.`,
      })

      router.push(`/tags/${newTag._id}`)
      router.refresh()
    } catch (error) {
      console.error("Failed to create tag:", error)
      toast({
        title: "Error",
        description: "Failed to create tag. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container max-w-2xl py-10">
      <Button variant="ghost" className="mb-6" asChild>
        <Link href="/tags">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Tags
        </Link>
      </Button>

      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Create New Tag</CardTitle>
          <CardDescription>Add a new tag to organize your documentation</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Tag Name</Label>
              <Input
                id="name"
                placeholder="e.g., API, Frontend, Backend"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full"
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Tag"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
