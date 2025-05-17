import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar, Edit } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getDocumentById } from "@/lib/documents"
import { formatDate } from "@/lib/utils"
import { DeleteDocumentButton } from "@/components/delete-document-button"
import { DocumentContent } from "@/components/document-content"
import { Card } from "@/components/ui/card"

interface DocumentPageProps {
  params: {
    id: string
  }
}

export default async function DocumentPage({ params }: DocumentPageProps) {
  const document = await getDocumentById(params.id)

  if (!document) {
    notFound()
  }

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <Button variant="ghost" className="mb-6" asChild>
        <Link href="/documents">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Documents
        </Link>
      </Button>

      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">{document.title}</h1>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href={`/documents/${document._id}/edit`}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Link>
              </Button>
              <DeleteDocumentButton id={document._id} />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Calendar className="mr-1 h-4 w-4" />
              Updated {formatDate(document.updatedAt)}
            </div>
            {document.category && (
              <>
                <span>•</span>
                <Badge variant="outline" className="bg-muted/50">
                  {document.category.name}
                </Badge>
              </>
            )}
            {document.tags && document.tags.length > 0 && (
              <>
                <span>•</span>
                <div className="flex flex-wrap gap-1">
                  {document.tags.map((tag) => (
                    <Badge key={tag._id} variant="secondary">
                      {tag.name}
                    </Badge>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <Card className="p-6 border shadow-sm">
          <DocumentContent content={document.content} />
        </Card>
      </div>
    </div>
  )
}
