import Link from "next/link"
import { Calendar, FileText } from "lucide-react"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"
import type { Document } from "@/lib/types"

interface DocumentCardProps {
  document: Document
}

export function DocumentCard({ document }: DocumentCardProps) {
  return (
    <Card className="h-full overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-3 bg-muted/30">
        <CardTitle className="flex items-start gap-2">
          <FileText className="h-5 w-5 mt-0.5 text-blue-500" />
          <Link href={`/documents/${document._id}`} className="hover:text-blue-600 transition-colors line-clamp-2">
            {document.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-3">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {document.content.substring(0, 150).replace(/[#*`]/g, "")}...
        </p>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2 pt-0">
        <div className="flex flex-wrap gap-1">
          {document.category && (
            <Badge variant="outline" className="text-xs bg-muted/50">
              {document.category.name}
            </Badge>
          )}
          {document.tags?.slice(0, 3).map((tag) => (
            <Badge key={tag._id} variant="secondary" className="text-xs">
              {tag.name}
            </Badge>
          ))}
        </div>
        <div className="flex items-center text-xs text-muted-foreground">
          <Calendar className="mr-1 h-3 w-3" />
          Updated {formatDate(document.updatedAt)}
        </div>
      </CardFooter>
    </Card>
  )
}
