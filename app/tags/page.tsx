import Link from "next/link"
import { Plus, Tag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { getTags } from "@/lib/tags"
import { getTagDocumentCount } from "@/lib/tags"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default async function TagsPage() {
  const tags = await getTags()
  const tagCounts = await Promise.all(
    tags.map(async (tag) => ({
      id: tag._id,
      count: await getTagDocumentCount(tag._id),
    })),
  )

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tags</h1>
          <p className="text-muted-foreground mt-1">Browse documentation by tag</p>
        </div>
        <Button asChild className="bg-blue-600 hover:bg-blue-700">
          <Link href="/tags/new">
            <Plus className="mr-2 h-4 w-4" /> New Tag
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Tags</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {tags.length > 0 ? (
              tags.map((tag) => {
                const count = tagCounts.find((c) => c.id === tag._id)?.count || 0

                return (
                  <Link key={tag._id} href={`/tags/${tag._id}`}>
                    <Badge
                      variant="outline"
                      className="text-sm py-1.5 px-3 hover:bg-blue-50 dark:hover:bg-blue-950 cursor-pointer transition-colors"
                    >
                      {tag.name}
                      <span className="ml-2 text-xs text-muted-foreground">{count}</span>
                    </Badge>
                  </Link>
                )
              })
            ) : (
              <div className="w-full text-center py-8">
                <Tag className="h-16 w-16 mx-auto text-blue-500 opacity-70 mb-4" />
                <h3 className="text-xl font-medium mb-2">No tags found</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Create your first tag to organize your documentation.
                </p>
                <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                  <Link href="/tags/new">
                    <Plus className="mr-2 h-4 w-4" /> Create Tag
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
