"use client"

import ReactMarkdown from "react-markdown"

interface DocumentContentProps {
  content: string
}

export function DocumentContent({ content }: DocumentContentProps) {
  return (
    <div className="prose dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-a:text-blue-600 dark:prose-a:text-blue-400">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  )
}
