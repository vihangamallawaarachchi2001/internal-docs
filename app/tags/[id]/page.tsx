import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { getTagById } from "@/lib/tags"
import { getDocumentsByTag } from "@/lib/tags"
import { DocumentCard } from "@/components/document-card"
import { DeleteTagButton } from "@/components/delete-tag-button"

interface TagPageProps {
  params: {
    id: string
  }
}

export default async function TagPage({ params }: TagPageProps) {
  const tag = await getTagById(params.id)

  if (!tag) {
    notFound()
  }

  const documents = await getDocumentsByTag(params.id)

  return (
    <div className="container mx-auto py-6 space-y-6">
      <Button variant="ghost" className="mb-2" asChild>
        <Link href="/tags">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Tags
        </Link>
      </Button>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">#{tag.name}</h1>
          <p className="text-muted-foreground mt-1">Documents tagged with "{tag.name}"</p>
        </div>
        <DeleteTagButton id={tag._id} name={tag.name} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {documents.length > 0 ? (
          documents.map((doc) => <DocumentCard key={doc._id} document={doc} />)
        ) : (
          <div className="col-span-3 border rounded-lg p-8 text-center">
            <h3 className="text-lg font-medium mb-2">No documents with this tag</h3>
            <p className="text-muted-foreground mb-4">Create your first document with this tag.</p>
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
