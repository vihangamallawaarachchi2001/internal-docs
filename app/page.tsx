import Link from "next/link"
import { ArrowRight, FileText, Plus, Search, BookOpen, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getRecentDocuments } from "@/lib/documents"
import { getCategories } from "@/lib/categories"
import { DocumentCard } from "@/components/document-card"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default async function Home() {
  const recentDocuments = await getRecentDocuments()
  const categories = await getCategories()

  return (
    <div className="container mx-auto py-8 space-y-10">
      {/* Hero Section */}
      <div className="relative rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 md:p-10 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,#ffffff10,#ffffff80)] dark:bg-grid-white/5" />
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
            Welcome to Your Documentation Portal
          </h1>
          <p className="text-lg text-white/90 mb-6">
            Your central hub for all internal documentation. Find, create, and organize knowledge in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-white/90" asChild>
              <Link href="/documents/new">
                <Plus className="mr-2 h-5 w-5" /> Create Document
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white/10"
              asChild
            >
              <Link href="/documents">
                <BookOpen className="mr-2 h-5 w-5" /> Browse All
              </Link>
            </Button>
          </div>
        </div>
        <div className="absolute right-4 bottom-4 opacity-20 md:opacity-30">
          <Sparkles className="h-32 w-32 text-white" />
        </div>
      </div>

      {/* Search Section */}
      <div className="relative">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search documentation..."
              className="w-full pl-10 py-6 text-lg rounded-lg border-2 focus-visible:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold tracking-tight">Categories</h2>
          <Button variant="ghost" asChild>
            <Link href="/categories">
              View all <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.slice(0, 6).map((category) => (
            <Card key={category._id} className="overflow-hidden transition-all hover:shadow-md">
              <CardHeader className="pb-3 bg-muted/50">
                <CardTitle>{category.name}</CardTitle>
                <CardDescription className="line-clamp-2">{category.description}</CardDescription>
              </CardHeader>
              <CardFooter className="pt-4">
                <Button variant="outline" asChild className="w-full">
                  <Link href={`/categories/${category._id}`}>
                    Browse <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Documents Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold tracking-tight">Recent Documents</h2>
          <Button variant="ghost" asChild>
            <Link href="/documents">
              View all <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recentDocuments.length > 0 ? (
            recentDocuments.map((doc) => <DocumentCard key={doc._id} document={doc} />)
          ) : (
            <div className="col-span-2 border rounded-lg p-8 text-center">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No documents yet</h3>
              <p className="text-muted-foreground mb-4">
                Create your first document to get started with your internal knowledge base.
              </p>
              <Button asChild>
                <Link href="/documents/new">
                  <Plus className="mr-2 h-4 w-4" /> Create Document
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
