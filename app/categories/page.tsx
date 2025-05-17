import Link from "next/link"
import { Plus, FolderKanban } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { getCategories } from "@/lib/categories"
import { getCategoryDocumentCount } from "@/lib/documents"

export default async function CategoriesPage() {
  const categories = await getCategories()
  const categoryCounts = await Promise.all(
    categories.map(async (category) => ({
      id: category._id,
      count: await getCategoryDocumentCount(category._id),
    })),
  )

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground mt-1">Browse documentation by category</p>
        </div>
        <Button asChild className="bg-blue-600 hover:bg-blue-700">
          <Link href="/categories/new">
            <Plus className="mr-2 h-4 w-4" /> New Category
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.length > 0 ? (
          categories.map((category) => {
            const count = categoryCounts.find((c) => c.id === category._id)?.count || 0

            return (
              <Card key={category._id} className="overflow-hidden transition-all hover:shadow-md">
                <CardHeader className="pb-2 bg-muted/30">
                  <CardTitle>{category.name}</CardTitle>
                  <CardDescription className="line-clamp-2">{category.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <span className="text-sm text-muted-foreground">
                    {count} {count === 1 ? "document" : "documents"}
                  </span>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="outline" size="sm" asChild className="w-full">
                    <Link href={`/categories/${category._id}`}>Browse</Link>
                  </Button>
                </CardFooter>
              </Card>
            )
          })
        ) : (
          <div className="col-span-3 border rounded-lg p-8 text-center bg-muted/10">
            <FolderKanban className="h-16 w-16 mx-auto text-blue-500 opacity-70 mb-4" />
            <h3 className="text-xl font-medium mb-2">No categories found</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Create your first category to organize your documentation.
            </p>
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link href="/categories/new">
                <Plus className="mr-2 h-4 w-4" /> Create Category
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
