import Link from "next/link"
import { Plus, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DocumentCard } from "@/components/document-card"
import { getAllDocuments } from "@/lib/documents"
import { DocumentFilters } from "@/components/document-filters"

export default async function DocumentsPage() {
  const documents = await getAllDocuments()

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">All Documents</h1>
          <p className="text-muted-foreground mt-1">Browse and search through all documentation</p>
        </div>
        <Button asChild className="bg-blue-600 hover:bg-blue-700">
          <Link href="/documents/new">
            <Plus className="mr-2 h-4 w-4" /> New Document
          </Link>
        </Button>
      </div>

      <div className="bg-muted/30 p-4 rounded-lg">
        <DocumentFilters />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {documents.length > 0 ? (
          documents.map((doc) => <DocumentCard key={doc._id} document={doc} />)
        ) : (
          <div className="col-span-3 border rounded-lg p-8 text-center bg-muted/10">
            <FileText className="h-16 w-16 mx-auto text-blue-500 opacity-70 mb-4" />
            <h3 className="text-xl font-medium mb-2">No documents found</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Create your first document to get started with your internal knowledge base.
            </p>
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
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
