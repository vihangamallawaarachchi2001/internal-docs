"use client"

import { useState } from "react"
import { Filter, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export function DocumentFilters() {
  const [open, setOpen] = useState(false)
  const [filters, setFilters] = useState<string[]>([])

  const addFilter = (filter: string) => {
    if (!filters.includes(filter)) {
      setFilters([...filters, filter])
    }
  }

  const removeFilter = (filter: string) => {
    setFilters(filters.filter((f) => f !== filter))
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <Filter className="h-3.5 w-3.5" />
              <span>Filters</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[240px] p-4" align="start">
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Categories</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="category-1" />
                    <Label htmlFor="category-1">Product</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="category-2" />
                    <Label htmlFor="category-2">Engineering</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="category-3" />
                    <Label htmlFor="category-3">Design</Label>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Tags</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="tag-1" onCheckedChange={() => addFilter("API")} />
                    <Label htmlFor="tag-1">API</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="tag-2" onCheckedChange={() => addFilter("Frontend")} />
                    <Label htmlFor="tag-2">Frontend</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="tag-3" onCheckedChange={() => addFilter("Backend")} />
                    <Label htmlFor="tag-3">Backend</Label>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Date</h4>
                <div className="grid gap-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="from" className="text-xs">
                        From
                      </Label>
                      <Input id="from" type="date" className="h-8" />
                    </div>
                    <div>
                      <Label htmlFor="to" className="text-xs">
                        To
                      </Label>
                      <Input id="to" type="date" className="h-8" />
                    </div>
                  </div>
                </div>
              </div>
              <Button size="sm" className="w-full" onClick={() => setOpen(false)}>
                Apply Filters
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        {filters.length > 0 && (
          <>
            {filters.map((filter) => (
              <Badge key={filter} variant="secondary" className="rounded-sm">
                {filter}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 ml-1 p-0 text-muted-foreground hover:text-foreground"
                  onClick={() => removeFilter(filter)}
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove {filter} filter</span>
                </Button>
              </Badge>
            ))}
            <Button variant="ghost" size="sm" className="h-8 px-2 text-xs" onClick={() => setFilters([])}>
              Clear all
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
