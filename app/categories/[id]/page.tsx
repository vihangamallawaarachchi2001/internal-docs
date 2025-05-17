import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Edit, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { getCategoryById } from "@/lib/categories"
import { getDocumentsByCategory } from "@/lib/documents"
import { DocumentCard } from "@/components/document-card"
import { DeleteCategoryButton } from "@/components/delete-category-button"

interface CategoryPageProps {
  params: {
    id: string
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = await getCategoryById(params.id)

  if (!category) {
    notFound()
  }

  const documents = await getDocumentsByCategory(params.id)

  return (
    <div className="container mx-auto py-6 space-y-6">
      <Button variant="ghost" className="mb-2" asChild>
        <Link href="/categories">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Categories
        </Link>
      </Button>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{category.name}</h1>
          <p className="text-muted-foreground mt-1">{category.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/categories/${category._id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </Button>
          <DeleteCategoryButton id={category._id} name={category.name} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {documents.length > 0 ? (
          documents.map((doc) => <DocumentCard key={doc._id} document={doc} />)
        ) : (
          <div className="col-span-3 border rounded-lg p-8 text-center">
            <h3 className="text-lg font-medium mb-2">No documents in this category</h3>
            <p className="text-muted-foreground mb-4">Create your first document in this category.</p>
            <Button asChild>
              <Link href="/documents/new">
                <Plus className="mr-2 h-4 w-4" /> Create Document
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
