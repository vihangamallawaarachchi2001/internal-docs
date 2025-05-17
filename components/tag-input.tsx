"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

interface TagInputProps {
  id?: string
  placeholder?: string
  tags: string[]
  setTags: (tags: string[]) => void
}

export function TagInput({ id, placeholder, tags, setTags }: TagInputProps) {
  const [inputValue, setInputValue] = useState("")

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue) {
      e.preventDefault()
      if (!tags.includes(inputValue.trim())) {
        setTags([...tags, inputValue.trim()])
      }
      setInputValue("")
    }
  }

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag))
  }

  return (
    <div className="flex flex-wrap gap-2 p-1.5 border rounded-md">
      {tags.map((tag) => (
        <Badge key={tag} variant="secondary" className="gap-1">
          {tag}
          <button type="button" onClick={() => removeTag(tag)} className="rounded-full hover:bg-muted">
            <X className="h-3 w-3" />
            <span className="sr-only">Remove {tag}</span>
          </button>
        </Badge>
      ))}
      <Input
        id={id}
        type="text"
        placeholder={placeholder || "Add tag..."}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 min-w-[120px] border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
      />
    </div>
  )
}
