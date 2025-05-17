"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import ReactMarkdown from "react-markdown"
import { Edit, Eye } from "lucide-react"

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
}

export function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  const [activeTab, setActiveTab] = useState<string>("write")

  return (
    <div className="border rounded-md overflow-hidden">
      <Tabs defaultValue="write" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 bg-muted/50">
          <TabsTrigger value="write" className="flex items-center gap-2">
            <Edit className="h-4 w-4" />
            Write
          </TabsTrigger>
          <TabsTrigger value="preview" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Preview
          </TabsTrigger>
        </TabsList>
        <TabsContent value="write" className="mt-0 p-0">
          <Textarea
            placeholder="Write your content in Markdown..."
            className="min-h-[300px] font-mono border-0 rounded-none focus-visible:ring-0 resize-y"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </TabsContent>
        <TabsContent value="preview" className="mt-0 p-0">
          <div className="min-h-[300px] p-4 prose dark:prose-invert max-w-none">
            {value ? (
              <ReactMarkdown>{value}</ReactMarkdown>
            ) : (
              <p className="text-muted-foreground">Nothing to preview</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
